import React, { ChangeEvent, useRef } from 'react'
import { GAP, CM_PER_INCH, DPI } from '../utils/photoUtils'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface PhotoSize {
  name: string;
  width: number;
  height: number;
  description?: string;
}

interface PaperSize {
  name: string;
  width: number;
  height: number;
  description?: string;
}

interface SettingsPanelProps {
  paperSizes: PaperSize[]
  photoSizes: PhotoSize[]
  photo: string | null
  selectedPaperSize: string
  selectedPhotoSize: string
  paperOrientation: string
  autoRotate: boolean
  bgColor: string
  gridLayout: {
    rows: number
    cols: number
    isRotated: boolean
    totalPhotos: number
    containerWidth: number
    containerHeight: number
  }
  onUploadPhoto: (e: ChangeEvent<HTMLInputElement>) => void
  onPaperSizeChange: (value: string) => void
  onPhotoSizeChange: (value: string) => void
  onOrientationChange: (value: string) => void
  onAutoRotateChange: (checked: boolean) => void
  onBgColorChange: (value: string) => void
  onDownload: () => void
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  paperSizes,
  photoSizes,
  photo,
  selectedPaperSize,
  selectedPhotoSize,
  paperOrientation,
  autoRotate,
  bgColor,
  gridLayout,
  onUploadPhoto,
  onPaperSizeChange,
  onPhotoSizeChange,
  onOrientationChange,
  onAutoRotateChange,
  onBgColorChange,
  onDownload
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // 更新事件处理器以适配新的接口
  const handlePaperSizeChange = (value: string) => {
    onPaperSizeChange(value);
  };

  const handlePhotoSizeChange = (value: string) => {
    onPhotoSizeChange(value);
  };

  const handleOrientationChange = (value: string) => {
    onOrientationChange(value);
  };

  const handleAutoRotateChange = (checked: boolean) => {
    onAutoRotateChange(checked);
  };

  const handleBgColorChange = (value: string) => {
    onBgColorChange(value);
  };

  const handlePrint = () => {
    if (!photo) return;
    
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    // 创建打印图像
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('请允许打开弹窗进行打印');
      return;
    }
    
    // 获取照片和纸张尺寸信息
    const photoSize = photoSizes.find(s => s.name === selectedPhotoSize);
    const paperSize = paperSizes.find(s => s.name === selectedPaperSize);
    
    if (!photoSize || !paperSize) return;
    
    // 确定纸张方向
    let paperWidth = paperSize.width;
    let paperHeight = paperSize.height;
    let isLandscape = false;
    
    // 检查gridLayout中的isRotated，或根据纸张宽高比确定方向
    if ((gridLayout.isRotated || (paperWidth > paperHeight)) !== (gridLayout.containerWidth < gridLayout.containerHeight)) {
      // 交换宽高，使用横向打印
      [paperWidth, paperHeight] = [paperHeight, paperWidth];
      isLandscape = true;
    }
    
    // 将cm转换为px (假设96dpi)
    const pxPerCm = 96 / 2.54;
    const paperWidthPx = paperWidth * pxPerCm;
    const paperHeightPx = paperHeight * pxPerCm;
    
    // 写入HTML
    printWindow.document.write(`
      <html>
        <head>
          <title>证件照打印 - ${photoSize.description}</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              width: ${paperWidthPx}px;
              height: ${paperHeightPx}px;
              position: relative;
              background-color: white;
            }
            .print-container {
              position: absolute;
              width: ${paperWidthPx}px;
              height: ${paperHeightPx}px;
              overflow: hidden;
            }
            .print-image {
              position: absolute;
              top: 0;
              left: 0;
              width: ${paperWidthPx}px;
              height: ${paperHeightPx}px;
            }
            @media print {
              @page {
                size: ${isLandscape ? 'landscape' : 'portrait'};
                margin: 0;
              }
              html, body {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
              }
              .print-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }
              .print-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: fill;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <img src="${canvas.toDataURL('image/png')}" class="print-image" />
          </div>
          <script>
            // 自动打印后关闭
            window.onload = function() {
              setTimeout(function() {
                window.print();
                // 打印对话框关闭后关闭窗口
                setTimeout(function() {
                  window.close();
                }, 500);
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Card className="w-full md:w-1/3">
      <CardHeader>
        <CardTitle>设置</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={onUploadPhoto} 
            accept="image/*" 
            className="hidden" 
          />
          <Button 
            onClick={triggerFileInput}
            variant="default" 
            className="w-full"
          >
            上传照片
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="photoSize">照片规格</Label>
            <Select value={selectedPhotoSize} onValueChange={handlePhotoSizeChange}>
              <SelectTrigger id="photoSize">
                <SelectValue placeholder="选择照片规格" />
              </SelectTrigger>
              <SelectContent>
                {photoSizes.map(size => (
                  <SelectItem key={size.name} value={size.name}>
                    {size.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="paperSize">纸张大小</Label>
            <Select value={selectedPaperSize} onValueChange={handlePaperSizeChange}>
              <SelectTrigger id="paperSize">
                <SelectValue placeholder="选择纸张大小" />
              </SelectTrigger>
              <SelectContent>
                {paperSizes.map(size => (
                  <SelectItem key={size.name} value={size.name}>
                    {size.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="orientation">纸张方向</Label>
            <Select value={paperOrientation} onValueChange={handleOrientationChange}>
              <SelectTrigger id="orientation">
                <SelectValue placeholder="选择纸张方向" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">自动选择</SelectItem>
                <SelectItem value="portrait">纵向 (Portrait)</SelectItem>
                <SelectItem value="landscape">横向 (Landscape)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="autoRotate" 
              checked={autoRotate}
              onCheckedChange={handleAutoRotateChange}
            />
            <Label htmlFor="autoRotate">自动选择最佳方向</Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bgColor">背景颜色</Label>
            <Select value={bgColor} onValueChange={handleBgColorChange}>
              <SelectTrigger id="bgColor">
                <SelectValue placeholder="选择背景颜色" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="white">白色</SelectItem>
                <SelectItem value="#f0f0f0">浅灰色</SelectItem>
                <SelectItem value="gray">灰色</SelectItem>
                <SelectItem value="#e6f7ff">淡蓝色</SelectItem>
                <SelectItem value="blue">深蓝色</SelectItem>
                <SelectItem value="#ff0000">红色</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <Button 
            variant="default" 
            className="w-full" 
            disabled={!photo}
            onClick={onDownload}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            下载照片
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            disabled={!photo}
            onClick={handlePrint}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            打印照片
          </Button>
        </div>

        {gridLayout.rows > 0 && (
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">布局</span>
                <span className="text-sm font-medium">{gridLayout.rows} 行 × {gridLayout.cols} 列</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">总数</span>
                <span className="text-sm font-medium">{gridLayout.totalPhotos} 张照片</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">方向</span>
                <span className="text-sm font-medium">{gridLayout.isRotated ? '已旋转纸张' : '标准方向'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">间距</span>
                <span className="text-sm font-medium">{(GAP/DPI*CM_PER_INCH).toFixed(2)}厘米</span>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

export default SettingsPanel 