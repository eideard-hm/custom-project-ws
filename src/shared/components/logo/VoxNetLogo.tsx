type Props = {
  size?: number;
  className?: string;
};

export function VoxNetLogo({ size, className }: Props) {
  return (
    <img
      src='/voxnet-logo.png'
      alt='VoxNet Logo'
      style={{ width: size, height: size }}
      className={className}
    />
  );
}
