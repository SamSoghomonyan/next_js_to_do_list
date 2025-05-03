import Todo from "../components/todos";
import dotenv from 'dotenv';
dotenv.config();
const theme = process.env.FIRST_THEME
console.log(theme)
export default function Home(){
  return <Todo theme={theme as string } />
}