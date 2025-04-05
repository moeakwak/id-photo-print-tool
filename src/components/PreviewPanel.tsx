import React from 'react'
import PhotoCanvas from './PhotoCanvas'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
        <Card className="h-full">
          <CardContent className="flex items-center justify-center min-h-[400px]">
            <div className="text-center text-muted-foreground">
              <svg className="mx-auto h-16 w-16 text-muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-4 text-sm font-medium">请上传证件照</p>
              <p className="mt-2 text-xs text-muted-foreground">支持JPG、PNG等常见图片格式</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full md:w-2/3">
      <Card>
        <CardHeader>
          <CardTitle>预览</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="relative w-full max-w-xl">
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
                className="w-full border border-border rounded-md overflow-hidden"
              />
              <div className="absolute bottom-3 right-3 bg-background/70 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-medium text-foreground shadow-sm border border-border">
                {rows}×{cols} ({rows * cols}张)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PreviewPanel 