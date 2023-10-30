/**
 * 加载图标资源
 */

/********************************* 图片资源加载 *************************************/
export const imgIconsModule: Record<string, {
    [key: string]: any;
}> = import.meta.glob('/src/assets/icon/img/**/*.{png,jpg,ipeg}')

// * 图片图标路径列表
export const imgIconsList: Array<string> = Object.keys(imgIconsModule)

// * 获取图片图标类型
export const getImgType = () => {
    const images: Array<any> = []




    return images
}



/**********************************************************************************/


