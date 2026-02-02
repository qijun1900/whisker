/**
 * 品牌颜色列表
 * 用于 Vendor 的品牌色选择
 */
export const BRAND_COLORS = [
  '#3B82F6', // 蓝色
  '#10B981', // 绿色
  '#EF4444', // 红色
  '#F59E0B', // 橙色
  '#8B5CF6', // 紫色
  '#EC4899', // 粉色
  '#6366F1', // 靛蓝
  '#14B8A6', // 青色
  '#F97316', // 深橙
  '#06B6D4', // 天蓝
  '#84CC16', // 黄绿
  '#A855F7', // 深紫
  '#EAB308', // 黄色
  '#22C55E', // 亮绿
  '#DC2626', // 深红
  '#0EA5E9', // 天空蓝
  '#F43F5E' , // 珊瑚红
  '#8E24AA', // 紫红
  '#3949AB', // 靛蓝色
]

/**
 * 从颜色列表中随机选择一个颜色
 * @param colors - 颜色数组，默认使用 BRAND_COLORS
 * @returns 随机选中的颜色值（十六进制格式）
 * 
 * @example
 * const randomColor = getRandomColor()
 * console.log(randomColor) // '#3B82F6'
 */
export function getRandomColor(colors: string[] = BRAND_COLORS): string {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
