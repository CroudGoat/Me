export const MAX_IMAGE_BYTES = 5_000_000;

export function isAcceptableImage(
  file: { type: string; size: number } | null | undefined,
): boolean {
  return (
    !!file &&
    file.type.startsWith('image/') &&
    file.size > 0 &&
    file.size <= MAX_IMAGE_BYTES
  );
}
