import type { Region } from './types'

/** Demo supply regions. Names are generic agro-ecological zones, not survey data. */
export const REGIONS: Region[] = [
  { id: 'central-highlands', name: 'Central Highlands', climate: 'Bimodal rainfall, 1,500–2,100 m', processingHubs: 14, logisticsIndex: 78, x: 52, y: 42 },
  { id: 'rift-valley', name: 'Rift Valley', climate: 'Semi-humid to semi-arid, mixed farming', processingHubs: 11, logisticsIndex: 66, x: 34, y: 38 },
  { id: 'lake-basin', name: 'Lake Basin', climate: 'Humid lowland, lakeshore fisheries', processingHubs: 8, logisticsIndex: 58, x: 14, y: 46 },
  { id: 'western-plateau', name: 'Western Plateau', climate: 'High rainfall, sugar and maize belt', processingHubs: 9, logisticsIndex: 54, x: 20, y: 24 },
  { id: 'eastern-lowlands', name: 'Eastern Lowlands', climate: 'Semi-arid, irrigated oilseed schemes', processingHubs: 5, logisticsIndex: 42, x: 70, y: 62 },
  { id: 'coastal-belt', name: 'Coastal Belt', climate: 'Hot humid coast, fruit and cashew', processingHubs: 6, logisticsIndex: 61, x: 86, y: 80 },
]

export const regionById = (id: string) => REGIONS.find((r) => r.id === id)
