import { useEffect, useRef, useState } from 'react'
import { cmToPixels, getBgColorValue, GAP } from '../utils/photoUtils'

interface PhotoCanvasProps {
  photo: string | null
  photoWidth: number
  photoHeight: number
  containerWidth: number
  containerHeight: number
  rows: number
  cols: number
  marginX: number
  marginY: number
  bgColor: string
  isPreview: boolean
  className?: string
  onRenderComplete?: (canvas: HTMLCanvasElement) => void
}

export const PhotoCanvas: React.FC<PhotoCanvasProps> = ({
  photo,
  photoWidth,
  photoHeight,
  containerWidth,
  containerHeight,
  rows,
  cols,
  marginX,
  marginY,
  bgColor,
  className = '',
  onRenderComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [aspectRatio, setAspectRatio] = useState(1)

  useEffect(() => {
    if (!photo || !canvasRef.current) return
    
    renderToCanvas()
  }, [photo, photoWidth, photoHeight, containerWidth, containerHeight, rows, cols, marginX, marginY, bgColor])

  const renderToCanvas = () => {
    if (!photo || !canvasRef.current) return
    
    const canvas = canvasRef.current
    
    // 始终使用高精度尺寸
    const pixelRatio = 300 / 96 // 300ppi / 默认96ppi
    
    // 设置Canvas的物理尺寸为高精度尺寸
    canvas.width = containerWidth * pixelRatio
    canvas.height = containerHeight * pixelRatio
    
    // 计算并保存宽高比用于预览
    const ratio = containerWidth / containerHeight
    setAspectRatio(ratio)
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // 缩放绘图上下文以适应高精度
    ctx.scale(pixelRatio, pixelRatio)
    
    // 创建临时图像来加载上传的照片
    const img = new Image()
    img.src = photo
    
    img.onload = () => {
      // 填充背景颜色
      ctx.fillStyle = getBgColorValue(bgColor)
      ctx.fillRect(0, 0, containerWidth, containerHeight)
      
      // 计算照片尺寸（像素）
      const targetWidth = cmToPixels(photoWidth)
      const targetHeight = cmToPixels(photoHeight)
      const scaledGap = GAP
      
      // 计算裁剪区域
      const sourceWidth = img.width
      const sourceHeight = img.height
      
      const ratio1 = sourceWidth / targetWidth
      const ratio2 = sourceHeight / targetHeight
      
      let cutWidth, cutHeight, cutX, cutY
      
      // 确定裁剪区域，保持原始照片比例
      if (ratio1 > ratio2) {
        cutWidth = targetWidth * ratio2
        cutHeight = sourceHeight
        cutX = (sourceWidth - cutWidth) / 2
        cutY = 0
      } else {
        cutHeight = targetHeight * ratio1
        cutWidth = sourceWidth
        cutY = (sourceHeight - cutHeight) / 2
        cutX = 0
      }
      
      // 计算起始位置，用于居中排列
      const w_start = marginX
      const h_start = marginY
      
      // 绘制照片网格
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const posX = w_start + i * (targetWidth + scaledGap)
          const posY = h_start + j * (targetHeight + scaledGap)
          
          // 绘制照片（带裁剪）
          ctx.drawImage(
            img, 
            cutX, cutY, cutWidth, cutHeight,  // 源图像裁剪区域
            posX, posY, targetWidth, targetHeight  // 目标位置和尺寸
          )
          
          // 绘制细边框
          ctx.strokeStyle = '#dddddd'
          ctx.lineWidth = 0.5
          ctx.strokeRect(posX, posY, targetWidth, targetHeight)
        }
      }
      
      // 在右下角添加文本水印
    //   ctx.fillStyle = '#ffffff'
    //   ctx.font = '12px Arial'
    //   const text = '证件照排版工具'
    //   ctx.fillText(text, containerWidth - 120, containerHeight - 15)
      
      // 生成预览图像URL
      setPreviewUrl(canvas.toDataURL('image/png'))

      // 回调通知渲染完成
      if (onRenderComplete) {
        onRenderComplete(canvas)
      }
    }
  }

  // 渲染隐藏Canvas和预览图像
  return (
    <div className={className} style={{ position: 'relative' }}>
      {/* 隐藏的高分辨率Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }}
      />
      
      {/* 可见的预览图像 */}
      {previewUrl && (
        <img 
          src={previewUrl} 
          alt="证件照预览" 
          style={{ 
            maxWidth: '100%',
            aspectRatio: String(aspectRatio),
            border: '1px solid #ddd'
          }}
        />
      )}
    </div>
  )
}

export default PhotoCanvas 