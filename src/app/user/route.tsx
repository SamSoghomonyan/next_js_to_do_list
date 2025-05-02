import {data} from "@/components/data";

export async function GET(){
  return Response.json(data)
}


export async function POST(req: Request){
  const comment  = await req.json();
  const newComment = {
    id: data.length + 1 ,
    comment : comment
  }
  data.push(newComment)
  return new Response((JSON.stringify(newComment)),{
    headers: {'Content-Type': 'application/json'}
  })
}