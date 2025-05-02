import Todo from "@/components/todo";
import dotenv from 'dotenv';
dotenv.config();
const theme = process.env.SECOND_THEME
console.log(theme)
export default function Home(){
  return <Todo theme={theme as string } />
}