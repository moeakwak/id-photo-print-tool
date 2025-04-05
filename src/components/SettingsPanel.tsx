import React, { ChangeEvent, useRef } from 'react'
import { GAP, CM_PER_INCH, DPI } from '../utils/photoUtils'

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
  }
  totalPhotos: number
  onUploadPhoto: (e: ChangeEvent<HTMLInputElement>) => void
  onPaperSizeChange: (e: ChangeEvent<HTMLSelectElement>) => void
  onPhotoSizeChange: (e: ChangeEvent<HTMLSelectElement>) => void
  onOrientationChange: (e: ChangeEvent<HTMLSelectElement>) => void
  onAutoRotateChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBgColorChange: (e: ChangeEvent<HTMLSelectElement>) => void
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

  return (
    <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">设置</h2>
      
      <div className="mb-4">
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={onUploadPhoto} 
          accept="image/*" 
          className="hidden" 
        />
        <button 
          onClick={triggerFileInput}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          上传照片
        </button>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          纸张大小
        </label>
        <select 
          value={selectedPaperSize}
          onChange={onPaperSizeChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {paperSizes.map(size => (
            <option key={size.name} value={size.name}>
              {size.description}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          纸张方向
        </label>
        <select 
          value={paperOrientation}
          onChange={onOrientationChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="auto">自动选择</option>
          <option value="portrait">纵向 (Portrait)</option>
          <option value="landscape">横向 (Landscape)</option>
        </select>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="autoRotate" 
            checked={autoRotate}
            onChange={onAutoRotateChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="autoRotate" className="ml-2 block text-sm text-gray-700">
            自动选择最佳方向（最多照片数）
          </label>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          照片规格
        </label>
        <select 
          value={selectedPhotoSize}
          onChange={onPhotoSizeChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {photoSizes.map(size => (
            <option key={size.name} value={size.name}>
              {size.description}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          背景颜色
        </label>
        <select 
          value={bgColor}
          onChange={onBgColorChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="white">白色</option>
          <option value="#f0f0f0">浅灰色</option>
          <option value="gray">灰色</option>
          <option value="#e6f7ff">淡蓝色</option>
          <option value="blue">深蓝色</option>
          <option value="#ff0000">红色</option>
        </select>
      </div>
      
      <div className="mt-8 space-y-2">
        <button 
          className={`w-full py-2 px-4 rounded font-medium transition-colors ${photo ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          disabled={!photo}
          onClick={onDownload}
        >
          下载照片
        </button>
      </div>

      {gridLayout.rows > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-gray-600">
            布局信息：{gridLayout.rows} 行 × {gridLayout.cols} 列
            {gridLayout.isRotated ? ' (已旋转纸张)' : ''}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            共可打印 {gridLayout.totalPhotos} 张照片
          </p>
          <p className="text-sm text-gray-600 mt-1">
            照片间距: {(GAP/DPI*CM_PER_INCH).toFixed(2)}厘米 ({GAP}像素)
          </p>
        </div>
      )}
    </div>
  )
}

export default SettingsPanel 