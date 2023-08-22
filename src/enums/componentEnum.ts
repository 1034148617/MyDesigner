/**
 * 容器模式枚举
 */
export enum GroupModeEnum {
    "TOP" = "top",
    "LEFT" = "left",
    "RIGHT" = "right",
    "BOTTOM" = "bottom",
    "NONE" = "none",
    "FILL" = "fill"
}

/**
 * 背景模式枚举
 */
export enum BackgroundModeEnum {
    "THEME" = 'theme',
    "TRANSPARENT" = 'transparent', // 透明
    "IMAGE" = 'image',
    "COLOR" = 'color'
}

/**
 * 边框设置枚举
 */
export enum BorderStyleEnum {
    "DASHED" = 'dashed',
    "SOLID" = 'solid',
    "DOTTED" = 'dotted'
}

/**
 * 滚动条枚举
 */
export enum ScrollBarsTypeEnum {
    NONE = 'none',
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
    BOTH = 'both'
}

/**
 * Display属性枚举
 */
export enum DisplayEnum {
    INLINE = "inline",
    INLINE_BLOCK = "inline-block",
    BLOCK = "block",
    FLEX = "flex"
}

/**
 * 光标样式枚举
 */
export enum CursorEnum {
    AUTO = "auto",
    DEFAULT = "default",
    POINTER = "pointer"
}

/**
 * 字体粗细属性枚举
 */
export enum FontWeightEnum {
    NORMAL = "normal",
    BOLD = "bord",              // 粗体
    LIGHTER = "lighter",        // 更细字体
    BOLDER = "bolder",          // 更粗字体
    ONE = "100",
    TWO = "200",
    THREE = "300",
    FOUR = "400",
    FIVE = "500",
    SIX = "600",
    SEVEN = "700",
    EIGHT = "800",
    NINE = "900"
}

/**
 * 常用字体枚举
 */
export enum FontFamilyEnum {
    Arial = "Arial, sans-serif",
    Helvetica = "Helvetica, sans-serif",
    Verdana = "Verdana, sans-serif",
    Georgia = "Georgia, serif",
    "Times New Roman" = "'Times New Roman', serif",
    "Courier New" = "'Courier New', monospace",
    "Lucida Console" = "'Lucida Console', monospace",
    Tahoma = "Tahoma, sans-serif",
    Palatino = "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    Futura = "Futura, sans-serif",
    Garamond = "Garamond, serif",
    "Bookman Old Style" = "'Bookman Old Style', serif",
    "Century Gothic" = "'Century Gothic', sans-serif",
    "Comic Sans MS" = "'Comic Sans MS', cursive, sans-serif",
    Impact = "Impact, Charcoal, sans-serif",
    "Lucida Sans" = "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
    "MS Sans Serif" = "'MS Sans Serif', Geneva, sans-serif",
    "MS Serif" = "'MS Serif', 'New York', sans-serif",
    Trebuchet = "'Trebuchet MS', sans-serif",
}

/**
 * 字体样式枚举
 */
export enum FontStyleEnum {
    NORMAL = "normal",
    ITALIC = "italic",      // 斜体
    OBLIQUE = "oblique",    // 倾斜体
    INHERIT = "inherit"
}

/**
 * 水平对齐方式枚举
 */
export enum HorizontalAlignment {
    Left = "left",
    Center = "center",
    Right = "right",
}   

/**
 * 竖直对齐方式枚举
 */
 export enum VerticalAlignment {
    Left = "top",
    Center = "middle",
    Right = "bottom",
}

/**
 * 文本装饰枚举
 */
export enum TextDecorationEnum {
    NONE = "none",
    UNDERLINE = "underline",
    OVERLINE = "overline",
    LINE_THROUGH = "line-through"
}