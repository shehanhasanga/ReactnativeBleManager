const defaultTheme: Theme = {
    palette: {
        default: '#e0e0e0',
        defaultDark: '#c2c2c2',
        primary: '#00ac51',
        secondary: '#f88400',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3',
        success: '#4caf50',
        background: '#ffffff',
        backgroundSecondary: '#f6f6f6',
        statusBar: '#ffffff',
        statusBarSecondary: '#f88400',
        header: '#f88400',
    },
    typography: {
        fontSize: 14, // https://material-ui.com/customization/typography/#font-size
        mediumFontSize: 16,
        subHeaderFontSize: 18,
        headerFontSize: 20,
        smallFontSize: 12,
        tinyFontSize: 10,
        primaryColor: '#818181',
        secondaryColor: '#ffffff',
        darkColor: '#000000',
        lightColor: '#ffffff',
        iconSize: 20,
        largeIconSize: 32,
        headerIconSize: 24,
        extraLargeIconSize: 40,
    },
    borderRadius: 4,
    spacing: 4,
};

export interface Palette {
    default: string;
    defaultDark: string;
    primary: string;
    secondary: string;
    error: string;
    warning: string;
    info: string;
    success: string;
    background: string;
    backgroundSecondary: string;
    statusBar: string;
    statusBarSecondary: string;
    header: string;
}

export interface Typography {
    fontSize: number;
    mediumFontSize: number;
    subHeaderFontSize: number;
    headerFontSize: number;
    smallFontSize: number;
    tinyFontSize: number;
    primaryColor: string;
    secondaryColor: string;
    darkColor: string;
    lightColor: string;
    iconSize: number;
    largeIconSize: number;
    headerIconSize: number;
    extraLargeIconSize: number;
}

export interface Theme {
    palette: Palette;
    typography: Typography;
    borderRadius: number;
    spacing: number;
}

export interface WithTheme {
    theme: Theme;
}
export default defaultTheme;
