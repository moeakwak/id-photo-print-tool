// 常量定义
export const CM_PER_INCH = 2.54
export const DPI = 300
export const GAP = 5 // 像素间隙，与sandphoto.inc中一致

// 将厘米转换为像素
export const cmToPixels = (cm: number): number => {
  return Math.floor(cm * DPI / CM_PER_INCH)
}

// 计算照片排版布局
export const calculateGridLayout = (
  photoWidth: number, 
  photoHeight: number, 
  paperWidth: number, 
  paperHeight: number,
  autoRotate: boolean
) => {
  // 转换为像素
  const targetWidth = cmToPixels(photoWidth)
  const targetHeight = cmToPixels(photoHeight)
  
  let containerWidth = cmToPixels(paperWidth)
  let containerHeight = cmToPixels(paperHeight)
  
  // 计算常规方向下每行每列能放置的照片数量
  const wn = Math.floor(containerWidth / (targetWidth + GAP))
  const hn = Math.floor(containerHeight / (targetHeight + GAP))
  
  // 计算旋转方向下每行每列能放置的照片数量
  const wn2 = Math.floor(containerHeight / (targetWidth + GAP))
  const hn2 = Math.floor(containerWidth / (targetHeight + GAP))
  
  let isRotated = false
  let cols = wn
  let rows = hn
  let finalContainerWidth = containerWidth
  let finalContainerHeight = containerHeight
  
  // 如果自动选择方向且旋转后能放更多照片，则选择旋转方向
  if (autoRotate && wn2 * hn2 > wn * hn) {
    isRotated = true
    cols = wn2
    rows = hn2
    finalContainerWidth = containerHeight
    finalContainerHeight = containerWidth
  }
  
  // 计算起始位置，使照片在页面中居中
  const marginX = (finalContainerWidth - cols * (targetWidth + GAP) + GAP) / 2
  const marginY = (finalContainerHeight - rows * (targetHeight + GAP) + GAP) / 2
  
  return {
    rows,
    cols,
    isRotated,
    marginX,
    marginY,
    totalPhotos: rows * cols,
    containerWidth: finalContainerWidth,
    containerHeight: finalContainerHeight,
    targetWidth,
    targetHeight
  }
}

// 获取背景颜色的实际值
export const getBgColorValue = (color: string): string => {
  switch (color) {
    case 'white':
      return '#ffffff'
    case 'blue':
      return '#000078'
    case 'gray':
      return '#808080'
    default:
      return color
  }
} 