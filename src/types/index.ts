export interface food {
  id: number;
  title: string;
  calories: number;
  created_at: string;
  description: string;
  ingredients: string[];
  user_id: string
}

export interface calendarElement {
  id:number;
  title: string;
  calories: number;
  created_at: string;
  date:string;
  foodWeight: number;
  user_id:string;
}

export interface errorType {
  code: string;
  details: null | string;
  hint: string;
  message: string;
}

export interface foodActionData {
  count: number | null;
  data: null;
  error: errorType | null;
  status: number;
  statusText: string;
}

export interface foodData {
  title: string;
  description: string;
  calories: number;
  ingredients: string[]
}

export interface calendarData {
  title: string;
  date: string;
  foodWeight: number;
}