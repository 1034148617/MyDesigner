import {
    GroupModeEnum,
    BackgroundModeEnum,
    BorderStyleEnum,
    ScrollBarsTypeEnum,
    DisplayEnum,
    FontWeightEnum,
    FontFamilyEnum,
    FontStyleEnum,
    HorizontalAlignment,
    TextDecorationEnum
} from "@/enums/componentEnum";

/**
 * 【背景】设置接口
 */
export interface BackgroundType {
    Color?: string,            // red | #000 
    ImageUrl?: string,
    Mode?: BackgroundModeEnum
}

/**
 * 【边框】设置接口 
 */
export interface BorderType {
    Width?: number,
    Style?: BorderStyleEnum,
    Color?: string,
    // ---
    TopWidth?: number,
    RightWidth?: number,
    BottomWidth?: number,
    LeftWidth?: number,
    // ---
    TopStyle?: BorderStyleEnum,
    RightStyle?: BorderStyleEnum,
    BottomStyle?: BorderStyleEnum,
    LeftStyle?: BorderStyleEnum,
    // ---
    TopColor?: string,
    RightColor?: string,
    BottomColor?: string,
    LeftColor?: string,
}

/**
 * 【边框圆角】设置接口
 */
export interface BorderRadiusType {
    Radius?: number | string | Array<number | string>,
    TopLeftRadius?: number | string,
    TopRightRadius?: number | string,
    BottomLeftRadius?: number | string,
    BottomRightRadius?: number | string
}

/**
 * 【内边距】设置接口
 */
export interface PaddingType {
    Width?: number | Array<number>,
    Top?: number,
    Bottom?: number,
    Left?: number,
    Right?: number
}

/**
 * 【外边距】设置接口
 */
export interface MarginType {
    Width?: number | Array<number>,
    Top?: number,
    Bottom?: number,
    Left?: number,
    Right?: number
}

/**
 * 【字体】设置接口
 */
export interface FontType {
    Color?: string,
    Size?: number,
    LineHeight?: number,
    Weight?: FontWeightEnum,
    Family?: FontFamilyEnum | Array<FontFamilyEnum>,
    Style?: FontStyleEnum,
    TextAlign?: HorizontalAlignment,
    TextDecoration?: TextDecorationEnum
}

/**
 * 整体样式
 */
export interface StyleType {
    Opacity?: number
    Background?: BackgroundType
    Border?: BorderType
    BorderRadius?: BorderRadiusType
    ScrollBars?: ScrollBarsTypeEnum
    Margin?: MarginType
    Padding?: PaddingType
    Font?: FontType
}

