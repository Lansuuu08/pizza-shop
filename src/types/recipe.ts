export interface Recipe {
  id: number
  name: string
  image?: string
  mealType?: string[]
  ingredients?: string[]
  instructions?: string
}
