const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = 5000;

dotenv.config();

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://fqpkdxmgtkfhuuqylnbv.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use("/", async (req, res) => {
  let { data: todo_sample, error } = await supabase
    .from("todo_sample")
    .select("*");
  console.log(todo_sample);

  res.send("<h2>My first superbase project</h2>");
});

app.listen(PORT, () => console.log(`starting server on ${PORT}`));
