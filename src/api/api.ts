import supabase from '../supabase';
import {
  type calendarElement,
  type errorType,
  type foodData,
  type food,
  type foodActionData,
  type calendarData
} from '@/types/index';


export async function fetchFoods(): Promise<{ data: food[]; error: errorType | null }> {
  return await supabase
    .from('foods')
    .select();
}

export async function fetchFood(title: string): Promise<{ data: food[]; error: errorType | null }> {
  return await supabase
    .from('foods')
    .select()
    .eq('title', title);
}

export async function addFoodToFoodlist(foodData: foodData): Promise<foodActionData> {
  return await supabase
    .from('foods')
    .insert([foodData]);
}

export async function updateFoodInFoodlist(foodData: foodData, id: number): Promise<{ data: food[]; error: errorType | null }> {
  return await supabase
    .from('foods')
    .update(foodData)
    .eq('id', id)
    .select();
}

export async function deleteFoodFromFoodlist(id: number): Promise<foodActionData> {
  return await supabase
    .from('foods')
    .delete()
    .eq('id', id);
}

export async function fetchCalendar(date:string): Promise<{ data: calendarElement[]; error: errorType | null }> {
  return await supabase
    .from('calendar')
    .select()
    .eq('date', date);
}

export async function addFoodToCalendar(calendarData: calendarData): Promise<foodActionData> {
  return await supabase
    .from('calendar')
    .insert(calendarData);
}

export async function deleteFoodFromCalendar(id: number): Promise<foodActionData> {
  return await supabase
    .from('calendar')
    .delete()
    .eq('id', id);
}
