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

export const photoSizes: PhotoSize[] = [
  // 常规证件照尺寸
  { name: "1inch", width: 2.5, height: 3.5, description: "1寸 (25×35mm)" },
  { name: "large1inch", width: 3.3, height: 4.8, description: "大一寸 (33×48mm)" },
  { name: "small1inch", width: 2.2, height: 3.2, description: "小一寸 (22×32mm)" },
  { name: "color_large1inch", width: 4.0, height: 5.5, description: "彩色大一寸 (40×55mm)" },
  { name: "color_small1inch", width: 2.7, height: 3.8, description: "彩色小一寸 (27×38mm)" },
  { name: "bw_large1inch", width: 3.3, height: 4.8, description: "黑白大一寸 (33×48mm)" },
  { name: "bw_small1inch", width: 2.2, height: 3.2, description: "黑白小一寸 (22×32mm)" },
  
  // 二寸照片
  { name: "2inch", width: 3.8, height: 5.1, description: "2寸 (38×51mm)" },
  { name: "large2inch", width: 3.5, height: 5.0, description: "大二寸 (35×50mm)" },
  { name: "small2inch", width: 3.5, height: 4.5, description: "小二寸 (35×45mm)" },
  { name: "large2inch_v2", width: 3.5, height: 5.3, description: "大二寸v2 (35×53mm)" },
  
  // 证件照
  { name: "id_card", width: 2.2, height: 3.2, description: "身份证 (22×32mm)" },
  { name: "id_card_v2", width: 2.6, height: 3.2, description: "第二代身份证 (26×32mm)" },
  { name: "driver_license", width: 2.2, height: 3.2, description: "驾驶证 (22×32mm)" },
  { name: "cn_passport", width: 3.3, height: 4.8, description: "中国护照 (33×48mm)" },
  { name: "us_visa", width: 5.1, height: 5.1, description: "赴美非移民签证 (51×51mm)" },
  { name: "us_imm_visa", width: 3.5, height: 4.0, description: "赴美移民签证 (35×40mm)" },
  { name: "ca_visa", width: 3.5, height: 4.5, description: "加拿大签证 (35×45mm)" },
  { name: "uk_visa", width: 3.5, height: 4.5, description: "英国签证 (35×45mm)" },
  { name: "au_visa", width: 3.5, height: 4.5, description: "澳大利亚签证 (35×45mm)" },
  { name: "jp_visa", width: 4.5, height: 4.5, description: "日本签证 (45×45mm)" },
  { name: "hk_travel_permit", width: 3.3, height: 4.8, description: "港澳通行证 (33×48mm)" },
  { name: "hk_passport", width: 4.0, height: 5.0, description: "香港特区护照 (40×50mm)" },
  { name: "general_id", width: 3.3, height: 4.8, description: "普通证件照 (33×48mm)" },
  { name: "vehicle_license", width: 6.0, height: 8.8, description: "机动车行驶证 (60×88mm)" },
  { name: "graduation", width: 3.3, height: 4.8, description: "毕业生照 (33×48mm)" },
  { name: "schengen_visa", width: 3.0, height: 4.0, description: "在美申请申根签证 (30×40mm)" },
  { name: "judicial_exam", width: 3.2, height: 4.6, description: "国家司法考试报名2寸 (32×46mm)" },
  { name: "arg_visa", width: 4.0, height: 4.0, description: "阿根廷签证 (40×40mm)" },
  { name: "it_visa", width: 3.4, height: 4.0, description: "意大利签证 (34×40mm)" },
  { name: "jp_exam", width: 2.4, height: 3.0, description: "日本资格考试报名 (24×30mm)" },
  { name: "ca_visa_b", width: 5.0, height: 7.0, description: "加拿大签证B (50×70mm)" },
  { name: "marriage_cert", width: 6.0, height: 4.0, description: "结婚证照片 (60×40mm)" },
  { name: "marriage_reg_2022", width: 5.3, height: 3.5, description: "结婚登记照2022 (53×35mm)" },
  { name: "th_visa", width: 4.0, height: 6.0, description: "泰国落地签 (40×60mm)" },
  { name: "size_3.5x3.0", width: 3.5, height: 3.0, description: "3.5x3.0厘米 (35×30mm)" },
  { name: "size_5.0x5.5", width: 5.0, height: 5.5, description: "5.0x5.5厘米 (50×55mm)" },
  { name: "half_body_2inch", width: 4.2, height: 4.7, description: "2吋半身照 (42×47mm)" },
];

export const paperSizes: PaperSize[] = [
  // 照片打印尺寸
  { name: "5inch", width: 12.7, height: 8.9, description: "5寸/3R (127×89mm)" },
  { name: "6inch", width: 15.2, height: 10.2, description: "6寸/4R (152×102mm)" },
  { name: "7inch", width: 17.8, height: 12.7, description: "7寸/5R (178×127mm)" },
  { name: "8inch", width: 20.3, height: 15.2, description: "8寸/6R (203×152mm)" },
  { name: "10inch", width: 25.4, height: 20.3, description: "10寸/8R (254×203mm)" },
  { name: "12inch", width: 25.4, height: 30.48, description: "12寸 (254×305mm)" },
  { name: "canon_4x6", width: 13.35, height: 8.9, description: "佳能4x6相纸 (133.5×89mm)" },
  { name: "postcard", width: 14.8, height: 10.0, description: "明信片 (148×100mm)" },
  { name: "hagaki", width: 10.0, height: 14.8, description: "Hagaki (100×148mm)" },
  
  // 常规打印纸尺寸
  { name: "a3", width: 29.7, height: 42.0, description: "A3 (297×420mm)" },
  { name: "a4", width: 21.0, height: 29.7, description: "A4 (210×297mm)" },
  { name: "a5", width: 14.8, height: 21.0, description: "A5 (148×210mm)" },
  { name: "a6", width: 10.5, height: 14.8, description: "A6 (105×148mm)" },
  { name: "b3", width: 50.0, height: 70.7, description: "B3 (500×707mm)" },
  { name: "b4", width: 25.0, height: 35.3, description: "B4 (250×353mm)" },
  { name: "b5", width: 17.6, height: 25.0, description: "B5 (176×250mm)" },
  { name: "letter", width: 21.59, height: 27.94, description: "Letter (216×279mm)" },
];

// 计算每张纸可排版的数量和最佳布局
export function calculateLayout(paperWidth: number, paperHeight: number, photoWidth: number, photoHeight: number, gap: number = 0.2): {
  rows: number;
  cols: number;
  total: number;
  isRotated: boolean;
} {
  // 常规方向
  const cols = Math.floor(paperWidth / (photoWidth + gap));
  const rows = Math.floor(paperHeight / (photoHeight + gap));
  const total = cols * rows;

  // 旋转纸张方向
  const colsRotated = Math.floor(paperHeight / (photoWidth + gap));
  const rowsRotated = Math.floor(paperWidth / (photoHeight + gap));
  const totalRotated = colsRotated * rowsRotated;

  if (totalRotated > total) {
    return {
      rows: rowsRotated,
      cols: colsRotated,
      total: totalRotated,
      isRotated: true
    };
  }

  return {
    rows,
    cols,
    total,
    isRotated: false
  };
} 