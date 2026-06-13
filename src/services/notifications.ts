import { addDays, parseISODate, type AgingMilestone } from '@/domain/umeshu';

const CHANNEL_ID = 'umeshu-reminders';
const ACTIVE_REMINDER_PREFIX = 'umeshu-active-reminder';

export type ReminderScheduleResult =
  | { status: 'scheduled'; identifier: string; dateISO: string }
  | { status: 'unavailable'; reason: string }
  | { status: 'permission_denied' }
  | { status: 'error'; message: string };

function buildReminderDate(dateISO: string, hour: number, minute: number) {
  const date = parseISODate(dateISO);
  date.setUTCHours(hour, minute, 0, 0);
  if (date.getTime() <= Date.now()) {
    const tomorrow = parseISODate(addDays(new Date().toISOString().slice(0, 10), 1));
    tomorrow.setUTCHours(hour, minute, 0, 0);
    return tomorrow;
  }
  return date;
}

export async function scheduleLocalReminder(input: {
  milestone: AgingMilestone;
  hour: number;
  minute: number;
  title: string;
  body: string;
}): Promise<ReminderScheduleResult> {
  if (process.env.EXPO_OS === 'web') {
    return { status: 'unavailable', reason: 'web' };
  }

  try {
    const Notifications = await import('expo-notifications');
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Umeshu reminders',
      importance: Notifications.AndroidImportance.DEFAULT,
    });

    const permissions = await Notifications.requestPermissionsAsync();
    if (!permissions.granted) {
      return { status: 'permission_denied' };
    }

    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    await Promise.all(
      scheduled
        .filter((request) => request.identifier.startsWith(ACTIVE_REMINDER_PREFIX))
        .map((request) => Notifications.cancelScheduledNotificationAsync(request.identifier)),
    );

    const date = buildReminderDate(input.milestone.dateISO, input.hour, input.minute);
    const identifier = await Notifications.scheduleNotificationAsync({
      identifier: `${ACTIVE_REMINDER_PREFIX}-${input.milestone.code}`,
      content: {
        title: input.title,
        body: input.body,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
        channelId: CHANNEL_ID,
      },
    });

    return { status: 'scheduled', identifier, dateISO: date.toISOString().slice(0, 10) };
  } catch (cause) {
    return { status: 'error', message: cause instanceof Error ? cause.message : 'Unknown notification error' };
  }
}

