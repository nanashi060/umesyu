export type PickImageResult =
  | { status: 'selected'; uri: string }
  | { status: 'cancelled' }
  | { status: 'permission_denied' }
  | { status: 'unavailable' }
  | { status: 'error'; message: string };

export async function pickBatchImage(): Promise<PickImageResult> {
  if (process.env.EXPO_OS === 'web') {
    return { status: 'unavailable' };
  }

  try {
    const ImagePicker = await import('expo-image-picker');
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return { status: 'permission_denied' };
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.8,
    });

    if (result.canceled) {
      return { status: 'cancelled' };
    }

    const uri = result.assets[0]?.uri;
    return uri ? { status: 'selected', uri } : { status: 'cancelled' };
  } catch (cause) {
    return { status: 'error', message: cause instanceof Error ? cause.message : 'Unknown image picker error' };
  }
}

