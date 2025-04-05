import React from 'react'
import PhotoCanvas from './PhotoCanvas'

interface PreviewPanelProps {
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
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  photo,
  photoWidth,
  photoHeight,
  containerWidth,
  containerHeight,
  rows,
  cols,
  marginX,
  marginY,
  bgColor
}) => {
  if (!photo) {
    return (
      <div className="w-full md:w-2/3">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-full">
          <div className="text-center text-gray-500">
            <svg className="mx-auto h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2">请上传证件照</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full md:w-2/3">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">预览</h2>
        <div className="flex justify-center">
          <PhotoCanvas
            photo={photo}
            photoWidth={photoWidth}
            photoHeight={photoHeight}
            containerWidth={containerWidth}
            containerHeight={containerHeight}
            rows={rows}
            cols={cols}
            marginX={marginX}
            marginY={marginY}
            bgColor={bgColor}
            isPreview={true}
            className="w-[400px] border border-gray-200"
          />
        </div>
      </div>
    </div>
  )
}

export default PreviewPanel 