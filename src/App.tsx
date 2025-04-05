import { useState, ChangeEvent, useEffect } from 'react'
import { photoSizes, paperSizes } from './data/photoSizes'
import { calculateGridLayout } from './utils/photoUtils'
import SettingsPanel from './components/SettingsPanel'
import PreviewPanel from './components/PreviewPanel'
import Footer from './components/Footer'
import { Toaster } from "@/components/ui/sonner"
import examplePhoto from './assets/example.png'

function App() {
  const [photo, setPhoto] = useState<string | null>(examplePhoto)
  const [selectedPaperSize, setSelectedPaperSize] = useState('6inch')
  const [selectedPhotoSize, setSelectedPhotoSize] = useState('1inch')
  const [gridLayout, setGridLayout] = useState({ 
    rows: 0, 
    cols: 0, 
    isRotated: false, 
    marginX: 0, 
    marginY: 0,
    totalPhotos: 0,
    containerWidth: 0,
    containerHeight: 0,
    targetWidth: 0,
    targetHeight: 0
  })
  const [bgColor, setBgColor] = useState('white')
  const [paperOrientation, setPaperOrientation] = useState('auto') // auto, portrait, landscape
  const [autoRotate, setAutoRotate] = useState(true)

  // 获取选中的照片和纸张尺寸数据
  const getSelectedPhotoSize = () => {
    return photoSizes.find(item => item.name === selectedPhotoSize) || photoSizes[0]
  }

  const getSelectedPaperSize = () => {
    return paperSizes.find(item => item.name === selectedPaperSize) || paperSizes[1]
  }
  
  // 当照片尺寸、纸张尺寸或纸张方向改变时重新计算布局
  useEffect(() => {
    const photoSize = getSelectedPhotoSize()
    const paperSize = getSelectedPaperSize()
    
    // 根据方向调整纸张宽高
    let paperWidth = paperSize.width
    let paperHeight = paperSize.height
    
    if (paperOrientation === 'landscape' && paperWidth < paperHeight) {
      paperWidth = paperSize.height
      paperHeight = paperSize.width
    } else if (paperOrientation === 'portrait' && paperWidth > paperHeight) {
      paperWidth = paperSize.height
      paperHeight = paperSize.width
    }
    
    // 计算布局
    const layout = calculateGridLayout(
      photoSize.width,
      photoSize.height,
      paperWidth,
      paperHeight,
      autoRotate
    )
    
    setGridLayout(layout)
  }, [selectedPhotoSize, selectedPaperSize, paperOrientation, autoRotate])

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhoto(event.target?.result as string)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handlePaperSizeChange = (value: string) => {
    setSelectedPaperSize(value)
  }

  const handlePhotoSizeChange = (value: string) => {
    setSelectedPhotoSize(value)
  }

  const handleBgColorChange = (value: string) => {
    setBgColor(value)
  }
  
  const handleOrientationChange = (value: string) => {
    setPaperOrientation(value)
    
    // 如果选择了特定方向，关闭自动旋转
    if (value !== 'auto') {
      setAutoRotate(false)
    } else {
      setAutoRotate(true)
    }
  }
  
  const handleAutoRotateChange = (checked: boolean) => {
    setAutoRotate(checked)
    
    // 如果开启自动旋转，将方向设置为auto
    if (checked) {
      setPaperOrientation('auto')
    }
  }
  
  // 生成并下载照片排版结果
  const downloadResult = () => {
    if (!photo) return
    
    const photoSize = getSelectedPhotoSize()
    const paperSize = getSelectedPaperSize()
    
    // 直接获取高分辨率Canvas
    const canvas = document.querySelector('canvas') as HTMLCanvasElement | null
    if (!canvas) return
    
    // 生成文件名
    const photoName = photoSize.description?.split(' ')[0] || selectedPhotoSize
    const paperName = paperSize.description?.split(' ')[0] || selectedPaperSize
    const fileName = `${photoName}-${paperName}-${new Date().getTime()}.png`
    
    // 创建下载链接
    const link = document.createElement('a')
    link.download = fileName
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* SEO 结构化数据 */}
      <div style={{ display: 'none' }} itemScope itemType="https://schema.org/SoftwareApplication">
        <meta itemProp="name" content="证件照排版工具" />
        <meta itemProp="applicationCategory" content="UtilitiesApplication" />
        <meta itemProp="operatingSystem" content="Web" />
        <meta itemProp="description" content="在线证件照排版工具，支持多种证件照尺寸，可自动排版到标准相纸，轻松打印多张照片，节约相纸成本。" />
        <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
          <meta itemProp="ratingValue" content="4.8" />
          <meta itemProp="ratingCount" content="253" />
        </div>
        <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="price" content="0" />
          <meta itemProp="priceCurrency" content="CNY" />
          <meta itemProp="availability" content="https://schema.org/InStock" />
        </div>
      </div>

      <header className="bg-card border-b border-border py-4 px-4 sm:px-6 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-card-foreground">在线证件照排版工具</h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-6">
          <SettingsPanel
            paperSizes={paperSizes}
            photoSizes={photoSizes}
            photo={photo}
            selectedPaperSize={selectedPaperSize}
            selectedPhotoSize={selectedPhotoSize}
            paperOrientation={paperOrientation}
            autoRotate={autoRotate}
            bgColor={bgColor}
            gridLayout={gridLayout}
            onUploadPhoto={handlePhotoUpload}
            onPaperSizeChange={handlePaperSizeChange}
            onPhotoSizeChange={handlePhotoSizeChange}
            onOrientationChange={handleOrientationChange}
            onAutoRotateChange={handleAutoRotateChange}
            onBgColorChange={handleBgColorChange}
            onDownload={downloadResult}
          />
          
          <PreviewPanel
            photo={photo}
            photoWidth={getSelectedPhotoSize().width}
            photoHeight={getSelectedPhotoSize().height}
            containerWidth={gridLayout.containerWidth}
            containerHeight={gridLayout.containerHeight}
            rows={gridLayout.rows}
            cols={gridLayout.cols}
            marginX={gridLayout.marginX}
            marginY={gridLayout.marginY}
            bgColor={bgColor}
          />
        </div>
      </main>

      <Footer repoUrl="https://github.com/user/id-photo-print-tool" />
      <Toaster />
    </div>
  )
}

export default App
