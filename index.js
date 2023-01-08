const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors")
const PORT = 5000;

dotenv.config();
app.use(cors());
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://fqpkdxmgtkfhuuqylnbv.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/", async (req, res) => {
  let { data: todo_sample, error } = await supabase
    .from("todo_sample")
    .select("*");
  console.log(todo_sample);

  res.send("<h2>My first superbase project</h2>");
});

app.post("/create", async (req, res) => {
  const { data, error } = await supabase
  .from('todo_sample')
  .insert([
    { 
      task_title: 'someValue', 
      task_description: 'otherValue',
      completed: false
    },
  ])
});

app.put("/update", async (req, res) => { 
  const { data, error } = await supabase
  .from('todo_sample')
  .update({ other_column: 'otherValue' })
  .eq('some_column', 'someValue')
});

app.delete("/delete", async (req, res) => {
  const { data, error } = await supabase
  .from('todo_sample')
  .delete()
  .eq('some_column', 'someValue')
});

app.listen(PORT, () => console.log(`starting server on ${PORT}`));
