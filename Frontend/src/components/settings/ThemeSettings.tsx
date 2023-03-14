import ThemeContrast from './ThemeContrast';
import ThemeRtlLayout from './ThemeRtlLayout';
// import SettingsDrawer from './drawer';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeSettings({ children }: Props) {
  return (
      <ThemeContrast>
        <ThemeRtlLayout>
          {children}
          {/* <SettingsDrawer /> */}
        </ThemeRtlLayout>
      </ThemeContrast>
  );
}
