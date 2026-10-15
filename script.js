const $ = (id) => document.getElementById(id);

let selectedLevel = "Foundation";
let currentProblem = null;
let attempts = 0;
let correctAnswers = 0;
let solutionVisible = true;
let hintVisible = true;

const samples = {
  "Triangles and the Pythagorean theorem": {
    Foundation: {
      title: "Find the Hypotenuse",
      problem: "A right triangle has legs of 3 cm and 4 cm. Find the length of the hypotenuse.",
      answer: "5",
      answerDisplay: "The hypotenuse is 5 cm.",
      hint: "Use the Pythagorean theorem: a² + b² = c². Substitute 3 and 4 for the two shorter sides.",
      steps: ["Write the formula: a² + b² = c².", "Substitute: 3² + 4² = c².", "Calculate: 9 + 16 = 25, so c = √25 = 5 cm."],
      explanation: "The Pythagorean theorem connects the legs of a right triangle to its hypotenuse. The hypotenuse is opposite the right angle.",
      numericAnswer: 5
    },
    Standard: {
      title: "Find the Hypotenuse and Area",
      problem: "In right triangle ABC, ∠B = 90°, AB = 6 cm and BC = 8 cm. Find the hypotenuse AC and the area of the triangle.",
      answer: "AC = 10 cm; area = 24 cm²",
      answerDisplay: "AC = 10 cm; area = 24 cm².",
      hint: "First use AC² = AB² + BC². Then use Area = ½ × base × height.",
      steps: ["Find the hypotenuse: AC² = 6² + 8² = 36 + 64 = 100.", "Take the square root: AC = √100 = 10 cm.", "Find the area: A = ½ × 6 × 8 = 24 cm²."],
      explanation: "Use the Pythagorean theorem to find the missing side, then use the two perpendicular legs as the base and height for the area.",
      numericAnswer: 10
    },
    Advanced: {
      title: "A Real-World Right Triangle",
      problem: "A 13 m ladder rests against a vertical wall. Its foot is 5 m from the wall. How high up the wall does the ladder reach, and what is the triangular area between the wall, ground, and ladder?",
      answer: "Height = 12 m; area = 30 m²",
      answerDisplay: "Height = 12 m; area = 30 m².",
      hint: "The ladder is the hypotenuse. Let the height be h and solve h² + 5² = 13².",
      steps: ["Set up the Pythagorean theorem: h² + 5² = 13².", "Solve: h² = 169 − 25 = 144, so h = 12 m.", "Find the area: A = ½ × 5 × 12 = 30 m²."],
      explanation: "Model the wall, ground, and ladder as a right triangle. The ladder is the hypotenuse, while the wall height and ground distance are the legs.",
      numericAnswer: 12
    }
  },
  "Area and perimeter": {
    Foundation: {title:"Rectangle Basics",problem:"A rectangle is 5 cm long and 3 cm wide. Find its perimeter.",answer:"16",answerDisplay:"The perimeter is 16 cm.",hint:"Perimeter is the total distance around a shape: P = 2(length + width).",steps:["Write P = 2(l + w).","Substitute: P = 2(5 + 3).","Calculate: P = 2 × 8 = 16 cm."],explanation:"Perimeter measures the distance around the outside of a two-dimensional shape.",numericAnswer:16},
    Standard: {title:"Area of a Triangle",problem:"A triangle has a base of 12 cm and a perpendicular height of 7 cm. Find its area.",answer:"42",answerDisplay:"The area is 42 cm².",hint:"Use A = ½ × base × height.",steps:["Write the formula: A = ½bh.","Substitute: A = ½ × 12 × 7.","Calculate: A = 42 cm²."],explanation:"The area of a triangle is half the area of a rectangle or parallelogram with the same base and height.",numericAnswer:42},
    Advanced: {title:"Garden Design",problem:"A rectangular garden has a perimeter of 34 m. Its length is 3 m greater than its width. Find its dimensions and area.",answer:"Width = 7 m; length = 10 m; area = 70 m²",answerDisplay:"Width = 7 m, length = 10 m, area = 70 m².",hint:"Let the width be w and length be w + 3. Use 2w + 2(w + 3) = 34.",steps:["Let width = w and length = w + 3.","Perimeter: 2w + 2(w + 3) = 34, so 4w + 6 = 34.","Solve: 4w = 28, so w = 7 m and length = 10 m.","Area = 7 × 10 = 70 m²."],explanation:"Represent the unknown width with a variable, express the length in terms of it, and use the perimeter to form an equation.",numericAnswer:7}
  },
  "Angles and parallel lines": {
    Foundation: {title:"Angles on a Straight Line",problem:"Two angles form a straight line. One angle is 120°. Find the other angle.",answer:"60",answerDisplay:"The other angle is 60°.",hint:"Angles on a straight line add up to 180°.",steps:["A straight angle is 180°.","Subtract the known angle: 180° − 120°.","The missing angle is 60°."],explanation:"Adjacent angles on a straight line are supplementary, meaning their measures add to 180°.",numericAnswer:60},
    Standard: {title:"Triangle Angle Sum",problem:"Two angles in a triangle are 48° and 67°. Find the third angle.",answer:"65",answerDisplay:"The third angle is 65°.",hint:"The interior angles of any triangle add up to 180°.",steps:["Write x + 48° + 67° = 180°.","Add the known angles: 48° + 67° = 115°.","Subtract: x = 180° − 115° = 65°."],explanation:"Every triangle has an interior angle sum of 180 degrees.",numericAnswer:65},
    Advanced: {title:"Angles with Parallel Lines",problem:"Two parallel lines are crossed by a transversal. A pair of same-side interior angles are (3x + 10)° and (5x + 2)°. Find x and both angle measures.",answer:"x = 21; angles = 73° and 107°",answerDisplay:"x = 21; the angles are 73° and 107°.",hint:"Same-side interior angles are supplementary, so their sum is 180°.",steps:["Set up the equation: (3x + 10) + (5x + 2) = 180.","Combine terms: 8x + 12 = 180, so 8x = 168.","Solve: x = 21.","Angles: 3(21) + 10 = 73° and 5(21) + 2 = 107°."],explanation:"Same-side interior angles formed by a transversal across parallel lines add up to 180 degrees.",numericAnswer:21}
  },
  "Similar triangles": {
    Foundation: {title:"Scale Factor",problem:"Two triangles are similar. A side of the smaller triangle is 3 cm and the corresponding side of the larger triangle is 6 cm. What is the scale factor from smaller to larger?",answer:"2",answerDisplay:"The scale factor is 2.",hint:"Divide the larger corresponding side by the smaller side.",steps:["Write scale factor = larger side ÷ smaller side.","Substitute: 6 ÷ 3.","The scale factor is 2."],explanation:"Similar triangles have equal corresponding angles and proportional corresponding sides.",numericAnswer:2},
    Standard: {title:"Find a Missing Side",problem:"Two triangles are similar. A 4 cm side in the smaller triangle corresponds to a 10 cm side in the larger triangle. If another smaller side is 6 cm, find its corresponding larger side.",answer:"15",answerDisplay:"The corresponding side is 15 cm.",hint:"The scale factor is 10 ÷ 4. Multiply 6 cm by this factor.",steps:["Find the scale factor: 10 ÷ 4 = 2.5.","Multiply the corresponding side: 6 × 2.5.","The larger side is 15 cm."],explanation:"For similar triangles, the ratio of corresponding side lengths is constant.",numericAnswer:15},
    Advanced: {title:"Shadow and Similarity",problem:"A 1.8 m student casts a 2.4 m shadow. At the same time, a tree casts a 10 m shadow. Assuming the ground is level, find the tree's height.",answer:"7.5",answerDisplay:"The tree is 7.5 m tall.",hint:"The height-to-shadow ratios are equal: 1.8 / 2.4 = h / 10.",steps:["Set up similar-triangle proportions: 1.8/2.4 = h/10.","Cross-multiply: 2.4h = 18.","Solve: h = 18 ÷ 2.4 = 7.5 m."],explanation:"Sunlight creates similar triangles because the student and tree are vertical and the sun's rays make the same angle with the ground.",numericAnswer:7.5}
  },
  "Circles": {
    Foundation: {title:"Circle Circumference",problem:"A circle has a radius of 4 cm. Find its circumference in terms of π.",answer:"8π",answerDisplay:"The circumference is 8π cm (about 25.13 cm).",hint:"Use C = 2πr, where r is the radius.",steps:["Write C = 2πr.","Substitute r = 4: C = 2π × 4.","Simplify: C = 8π cm."],explanation:"Circumference is the distance around a circle. It equals 2π times the radius.",numericAnswer:8},
    Standard: {title:"Area of a Circle",problem:"A circular fountain has a radius of 5 m. Find its area in terms of π.",answer:"25π",answerDisplay:"The area is 25π m² (about 78.54 m²).",hint:"Use A = πr² and square the radius before multiplying by π.",steps:["Write A = πr².","Substitute r = 5: A = π × 5².","Simplify: A = 25π m²."],explanation:"The area of a circle is proportional to the square of its radius.",numericAnswer:25},
    Advanced: {title:"Find the Radius from Area",problem:"A circular patio has an area of 154 cm². Using π ≈ 22/7, estimate its radius.",answer:"7",answerDisplay:"The radius is approximately 7 cm.",hint:"Start with A = πr². Rearrange to r² = A/π, then take the square root.",steps:["Use A = πr², so r² = 154 ÷ (22/7).","Calculate: r² = 154 × 7/22 = 49.","Take the positive square root: r = 7 cm."],explanation:"Rearrange the circle area formula to isolate r², then take the positive square root because a radius is a length.",numericAnswer:7}
  }
};

function setStatus(message){$("status").textContent=message;}
function escapeText(value){return String(value ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function renderProblem(problem, mode="Sample activity"){
  currentProblem=problem;
  $("problemTitle").textContent=problem.title || "Your Geometry Challenge";
  $("problemText").textContent=problem.problem;
  $("hintText").textContent=problem.hint || "Identify the relevant geometry formula and write down what you know.";
  $("solutionList").innerHTML=(problem.steps||[]).map(s=>`<li>${escapeText(s)}</li>`).join("");
  $("finalAnswer").textContent=problem.answerDisplay || problem.answer || "Check the steps above.";
  $("explanationText").textContent=problem.explanation || "Connect the diagram, the known information, and the appropriate geometry rule.";
  $("levelBadge").textContent=`${selectedLevel==="Foundation"?"✦":selectedLevel==="Standard"?"▥":"☆"} LEVEL ${selectedLevel==="Foundation"?"1":selectedLevel==="Standard"?"2":"3"} — ${selectedLevel.toUpperCase()}`;
  $("levelBadge").className=`level-badge ${selectedLevel.toLowerCase()}-badge`;
  $("modeBadge").textContent=mode;
  $("answerInput").value="";
  $("feedback").textContent="";
  $("feedback").className="feedback";
}
function sampleProblem(){
  const topic=$("topic").value;
  return JSON.parse(JSON.stringify(samples[topic][selectedLevel]));
}
async function generateProblem(){
  const btn=$("generateBtn");
  btn.disabled=true; btn.innerHTML="<span>✦</span> Generating...";
  setStatus("Preparing a personalized geometry task...");
  try{
    const response=await fetch("/.netlify/functions/generate",{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({topic:$("topic").value,level:selectedLevel,action:"problem"})
    });
    if(!response.ok) throw new Error("AI endpoint is not configured.");
    const data=await response.json();
    if(!data.problem || !data.problem.problem) throw new Error("The AI response was incomplete.");
    renderProblem(data.problem,"AI-generated");
    setStatus("A new AI-generated problem is ready. Check the math as you work.");
  }catch(err){
    renderProblem(sampleProblem(),"Sample mode");
    setStatus("Showing a verified sample problem. Configure the Netlify AI function to enable live AI generation.");
  }finally{btn.disabled=false;btn.innerHTML="<span>✦</span> Generate New Problem";}
}
function setLevel(level){
  selectedLevel=level;
  document.querySelectorAll(".level").forEach(btn=>{
    const chosen=btn.dataset.level===level;
    btn.classList.toggle("selected",chosen);
    btn.setAttribute("aria-pressed",String(chosen));
  });
  renderProblem(sampleProblem(),"Sample activity");
  setStatus(`${level} level selected. Generate a new problem or practice this sample.`);
}
function normalize(s){return String(s).toLowerCase().replace(/,/g,"").replace(/²/g,"2").replace(/cm|m|°|area|height|length|the|is|=|\s/g,"").replace(/approximately|about/g,"");}
function checkAnswer(){
  if(!currentProblem)return;
  const user=$("answerInput").value.trim();
  if(!user){$("feedback").textContent="Enter an answer first."; $("feedback").className="feedback incorrect";return;}
  attempts++;
  const expected=String(currentProblem.answer||"");
  const n=Number(user.replace(/,/g,""));
  const target=Number(currentProblem.numericAnswer);
  let correct=false;
  if(Number.isFinite(n)&&Number.isFinite(target)) correct=Math.abs(n-target)<0.011;
  else correct=normalize(user)===normalize(expected);
  if(correct){correctAnswers++;$("feedback").textContent="Correct! Great work — you can review the solution to see why."; $("feedback").className="feedback correct";}
  else{$("feedback").textContent="Not quite yet. Try the hint, review the formula, and give it another attempt."; $("feedback").className="feedback incorrect";}
  updateProgress();
}
function updateProgress(){
  $("solvedCount").textContent=correctAnswers;
  $("attemptCount").textContent=attempts;
  $("accuracy").textContent=attempts?Math.round(correctAnswers/attempts*100)+"%":"0%";
}
async function askAI(action){
  if(!currentProblem)return;
  const button=action==="hint"?$("hintBtn"):$("solutionBtn");
  const original=button.textContent;
  button.disabled=true;button.textContent="Thinking...";
  try{
    const response=await fetch("/.netlify/functions/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({topic:$("topic").value,level:selectedLevel,action,problem:currentProblem.problem})});
    if(!response.ok)throw new Error("AI endpoint not configured");
    const data=await response.json();
    if(action==="hint"&&data.hint)$("hintText").textContent=data.hint;
    if(action==="solution"&&data.steps){
      $("solutionList").innerHTML=data.steps.map(s=>`<li>${escapeText(s)}</li>`).join("");
      if(data.answer)$("finalAnswer").textContent=data.answer;
      if(data.explanation)$("explanationText").textContent=data.explanation;
    }
    setStatus("AI guidance updated for the selected level.");
  }catch(err){
    if(action==="hint")$("hintText").textContent=currentProblem.hint;
    else{$("solutionList").innerHTML=(currentProblem.steps||[]).map(s=>`<li>${escapeText(s)}</li>`).join("");$("finalAnswer").textContent=currentProblem.answerDisplay||currentProblem.answer;$("explanationText").textContent=currentProblem.explanation;}
    setStatus("Showing the built-in guidance. Configure the AI function for live personalized guidance.");
  }finally{button.disabled=false;button.textContent=original;}
}
document.querySelectorAll(".level").forEach(btn=>btn.addEventListener("click",()=>setLevel(btn.dataset.level)));
$("generateBtn").addEventListener("click",generateProblem);
$("resetBtn").addEventListener("click",()=>{renderProblem(sampleProblem(),"Sample activity");setStatus("A new sample activity is ready.");});
$("hintBtn").addEventListener("click",()=>askAI("hint"));
$("solutionBtn").addEventListener("click",()=>askAI("solution"));
$("checkBtn").addEventListener("click",checkAnswer);
$("answerInput").addEventListener("keydown",e=>{if(e.key==="Enter")checkAnswer();});
$("topic").addEventListener("change",()=>{renderProblem(sampleProblem(),"Sample activity");setStatus("Topic changed. A new sample problem is ready.");});
renderProblem(samples["Triangles and the Pythagorean theorem"].Foundation);
