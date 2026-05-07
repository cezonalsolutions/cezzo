
  var supabase = window.supabase.createClient(
  "https://izoipzriynkcjtwuzrfu.supabase.co",
  "sb_publishable_7ZRL1Y4JAppLTJonepuTIw_UQyGjVVw"
);
if(sessionStorage.getItem("skipIntro") === "true"){

    sessionStorage.removeItem("skipIntro");

    splash.style.display = "none";
    main.style.display = "none";

    // 🔥 CHANGE HERE
    home.style.display = "none";              // ❌ don't show home
    optionScreen.style.display = "block";     // ✅ show option screen

    // restore saved address
    cityName.innerText =
      localStorage.getItem("savedCity") || "Your Location";

    shortAddress.innerText =
      localStorage.getItem("savedAddress") || "";
}
else{

setTimeout(()=>{

  main.style.display = "flex";
  showOnly("detecting");

  splash.style.opacity = "0";
  splash.style.transition = "0.6s";

  setTimeout(()=>{
    splash.style.display = "none";
    getLocation();
  },600);

},2600);

}
let locationTimeout;
function getLocation(){

  // 🔥 START 30 SECOND TIMER
  locationTimeout = setTimeout(()=>{
    showOnly("locationError");
  }, 20000);

  navigator.geolocation.getCurrentPosition(async(pos)=>{

    clearTimeout(locationTimeout); // ✅ STOP TIMER

    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
    const data = await res.json();
    const a = data.address;

    let line1 = [a.road, a.suburb || a.village].filter(Boolean).join(", ");
    let line2 = [a.city || a.town, a.state].filter(Boolean).join(", ");
    let full = [line1,line2].filter(Boolean).join(", ");

    let city = a.city || a.town || a.village || "Your Location";

    addressText.innerText = full;

    showOnly("success");

    setTimeout(()=>{
      main.style.display="none";
      document.getElementById("optionScreen").style.display="flex";

      document.getElementById("optCityName").innerText = city;
      document.getElementById("optShortAddress").innerText = full;

      cityName.innerText = city;
      shortAddress.innerText = full;

      localStorage.setItem("savedCity", city);
      localStorage.setItem("savedAddress", full);

    },3000);

  }, ()=>{

    clearTimeout(locationTimeout); // ✅ STOP TIMER

    showOnly("locationError");

  });

}
function loadSavedLocation(){

  const savedCity = localStorage.getItem("savedCity");
  const savedAddress = localStorage.getItem("savedAddress");

  if(savedCity){
    document.getElementById("optCityName").innerText = savedCity;
    cityName.innerText = savedCity;
  }

  if(savedAddress){
    document.getElementById("optShortAddress").innerText = savedAddress;
    shortAddress.innerText = savedAddress;
  }

}
loadSavedLocation();
document.getElementById("cizooBtn").onclick = function(){
  document.getElementById("optionScreen").style.display="none";
  home.style.display="block";
};
// 🔁 retry
document.getElementById("retryBtn").onclick = function(){
  showOnly("detecting");
  getLocation(); // 🔥 ask again
};
document.getElementById("retryBtnManual").onclick = function(){

  showOnly("detecting");
  getLocation();

};

// ✍️ manual entry
document.getElementById("manualBtn").onclick = function(){
  showOnly("manualEntry");
};

// 💾 save manual
document.getElementById("saveManual").onclick = function(){

  const input = document.getElementById("manualAddress");
  const val = input.value.trim();

  // ❌ EMPTY → SHAKE
  if(!val){
    input.classList.remove("inputError");
    void input.offsetWidth;
    input.classList.add("inputError");
    return;
  }

  // ✅ VALID → continue
  addressText.innerText = val;

  showOnly("success");

  setTimeout(()=>{
    main.style.display="none";
    document.getElementById("optionScreen").style.display="flex";

    const parts = val.split(",").map(p => p.trim());

    let city = parts[0] || "Your Location";
    let rest = parts.slice(1).join(", ");

    // 🔥 OPTION SCREEN (IMPORTANT FIX)
    document.getElementById("optCityName").innerText = city;
    document.getElementById("optShortAddress").innerText = rest;

    // 🔥 HOME SCREEN
    cityName.innerText = city;
    shortAddress.innerText = rest;

    // 🔥 STORAGE
    localStorage.setItem("savedCity", city);
    localStorage.setItem("savedAddress", rest);

  },2000);

};
document.addEventListener("DOMContentLoaded", () => {

  const words = [
    "groceries",
    "drinks",
    "fruits",
    "snacks",
    "vegetables",
    "dairy"
  ];

  const input = document.getElementById("searchInput");

  let i = 0;

  function changeWord() {

    // don't animate if user typing
    if (input.value.length !== 0) return;

    // animate up (fade + move)
    input.style.transition = "all 0.3s ease";
    input.style.opacity = "0";
    input.style.transform = "translateY(-8px)";

    setTimeout(() => {
      input.placeholder = "Search for " + words[i];

      // reset from below
      input.style.transform = "translateY(8px)";

      setTimeout(() => {
        input.style.opacity = "1";
        input.style.transform = "translateY(0)";
      }, 50);

      i = (i + 1) % words.length;

    }, 300);
  }

  setInterval(changeWord, 2000);

});
function normalize(text){
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

const translateMap = {
  pindi: "flour",
  biyyam: "rice",
  paalu: "milk",
  neyyi: "ghee",
  karam: "spice",
  oil: "oil"
};
function showOnly(id){
  ["detecting","success","locationError","manualEntry"].forEach(sec=>{
    document.getElementById(sec).style.display="none";
  });
  document.getElementById(id).style.display="block";
}
const categories = document.querySelectorAll(".catItem");

categories.forEach(cat => {
  cat.addEventListener("click", () => {
    const color = cat.getAttribute("data-color");

    document.getElementById("topSection").style.background = color;

    categories.forEach(c => c.classList.remove("active"));
    cat.classList.add("active");

    const text = cat.innerText.trim();

  const content = document.getElementById("contentSection");
  const productSection = document.getElementById("productSection");
  const productSection2 = document.getElementById("productSection2"); 
  const productSection3 = document.getElementById("productSection3");
const productSection4 = document.getElementById("productSection4");
const productSection5 = document.getElementById("productSection5");// ALL
const fresh = document.getElementById("freshSection");     // FRESH
const offer = document.getElementById("offerSection");     // 50%
const cool = document.getElementById("coolSection");
const skin = document.getElementById("skinSection");
const homeSec = document.getElementById("homeSection");
const choco = document.getElementById("chocoSection");
const grocery = document.getElementById("grocerySection");
const freshItems = document.getElementById("freshItems");
const dailyItems = document.getElementById("dailyItems");
const beautyItems = document.getElementById("beautyItems");
const houseItems = document.getElementById("houseItems");
const wholesaleItems = document.getElementById("wholesaleItems");
const wholesaleFruits = document.getElementById("wholesaleFruits");
const productSection6 = document.getElementById("productSection6");
const productSection7 = document.getElementById("productSection7");
const productSection8 = document.getElementById("productSection8");
const productSection9 = document.getElementById("productSection9");
const productSection10 = document.getElementById("productSection10");
const productSection11 = document.getElementById("productSection11");
const colldrinksec = document.getElementById("colldrinksec");
const productSection12 = document.getElementById("productSection12");
const productSection13 = document.getElementById("productSection13");
const productSection14 = document.getElementById("productSection14");
const wholesalebrand = document.getElementById("wholesalebrand");

const productSection15 = document.getElementById("productSection15");
const productSection16 = document.getElementById("productSection16");
const productSection17 = document.getElementById("productSection17");
const productSection18 = document.getElementById("productSection18");
const productSection19 = document.getElementById("productSection19");
const productSection21 = document.getElementById("productSection21");
const productSection22 = document.getElementById("productSection22");
const wholesalecools = document.getElementById("wholesalecools");
const productSection23 = document.getElementById("productSection23");
const productSection24 = document.getElementById("productSection24");
const productSection25 = document.getElementById("productSection25");
const productSection26 = document.getElementById("productSection26");
const productSection27 = document.getElementById("productSection27");

const productSection28 = document.getElementById("productSection28");

const productSection29 = document.getElementById("productSection29");

const productSection30 = document.getElementById("productSection30");

const productSection31 = document.getElementById("productSection31");

const productSection32 = document.getElementById("productSection32");
const productSection40 = document.getElementById("productSection40");
const productSection41 = document.getElementById("productSection41");
const productSection42 = document.getElementById("productSection42");
const productSection43 = document.getElementById("productSection43");
const productSection44 = document.getElementById("productSection44");
const productSection45 = document.getElementById("productSection45");
const productSection46 = document.getElementById("productSection46");
const productSection47 = document.getElementById("productSection47");
const freshItems4 = document.getElementById("freshItems4");
const productSection48 = document.getElementById("productSection48");
const productSection49 = document.getElementById("productSection49");
const productSection50 = document.getElementById("productSection50");
const productSection51 = document.getElementById("productSection51");
const productSection52 = document.getElementById("productSection52");
const productSection53 = document.getElementById("productSection53");
const productSection54 = document.getElementById("productSection54");
const productSection55 = document.getElementById("productSection55");

const productSection56 = document.getElementById("productSection56");

const productSection57 = document.getElementById("productSection57");
const productSection58 = document.getElementById("productSection58");
const productSection59 = document.getElementById("productSection59");
const productSection60 = document.getElementById("productSection60");
const productSection61 = document.getElementById("productSection61");
const productSection62 = document.getElementById("productSection62");






if(text === "All"){
  content.style.display = "flex";
   productSection.style.display = "block";   // ✅ SHOW PRODUCTS
productSection2.style.display = "block";   // ✅ SHOW 2nd row
  fresh.style.display = "none";
  offer.style.display = "none";
  cool.style.display = "none";
  homeSec.style.display = "none";
  skin.style.display = "none"; 
  choco.style.display = "none";grocery.style.display = "none";
  freshItems.style.display = "block";
dailyItems.style.display = "block";
productSection6.style.display = "none";
wholesalebrand.style.display = "block";
productSection7.style.display = "none";
productSection8.style.display = "none";
productSection9.style.display = "none";
productSection15.style.display = "none";
productSection23.style.display = "none";
productSection21.style.display = "none";
  productSection22.style.display = "none"; 
productSection16.style.display = "none";
productSection17.style.display = "none";
productSection18.style.display = "none";
productSection19.style.display = "none";
productSection20.style.display = "none";
productSection25.style.display = "none";
productSection26.style.display = "none";
productSection27.style.display = "none";

beautyItems.style.display = "block";
houseItems.style.display = "block";
productSection3.style.display = "block";
 productSection10.style.display = "none";
  productSection12.style.display = "none";
productSection4.style.display = "block";
productSection5.style.display = "block";
wholesaleItems.style.display = "block"; 
wholesaleFruits.style.display = "none";
productSection11.style.display = "none";
productSection21.style.display = "none";
  productSection22.style.display = "none"; 
colldrinksec.style.display = "none";
productSection13.style.display = "none";  // ✅ FIX
productSection14.style.display = "none"; 
wholesalecools.style.display = "none";
productSection24.style.display = "none";
productSection28.style.display = "none";
productSection29.style.display = "none";
productSection30.style.display = "none";
productSection31.style.display = "none";
productSection32.style.display = "none";

productSection40.style.display = "none";
productSection41.style.display = "none";
productSection42.style.display = "none";
productSection43.style.display = "none";
productSection44.style.display = "none";
productSection45.style.display = "none";
productSection46.style.display = "none";
productSection47.style.display = "none";
freshItems4.style.display = "none";
productSection48.style.display = "none";
productSection49.style.display = "none";
productSection50.style.display = "none";
productSection51.style.display = "none";
productSection52.style.display = "none";
productSection53.style.display = "none";
productSection54.style.display = "none";
productSection55.style.display = "none";

productSection56.style.display = "none";
productSection57.style.display = "none";
productSection58.style.display = "none";
productSection59.style.display = "none";
productSection60.style.display = "none";
productSection61.style.display = "none";
productSection62.style.display = "none";


}

else if(text === "Fresh"){
    productSection.style.display = "none";   // ❌ HIDE PRODUCTS
productSection2.style.display = "none";   // ❌ HIDE 2nd row
  content.style.display = "none";
  fresh.style.display = "flex";
  wholesalebrand.style.display = "none";

   productSection6.style.display = "block";
productSection7.style.display = "block";
productSection8.style.display = "block";
productSection9.style.display = "block";
wholesaleFruits.style.display = "block";
  offer.style.display = "none";
  cool.style.display = "none";
  productSection15.style.display = "none";
productSection16.style.display = "none";
productSection17.style.display = "none";
productSection18.style.display = "none";
productSection19.style.display = "none";
productSection20.style.display = "none";
  skin.style.display = "none"; 
  productSection3.style.display = "none";
productSection4.style.display = "none";
productSection5.style.display = "none";
 productSection10.style.display = "none";
 productSection13.style.display = "none";
  freshItems.style.display = "none";
dailyItems.style.display = "none";
productSection21.style.display = "none";
  productSection22.style.display = "none"; 
beautyItems.style.display = "none";
houseItems.style.display = "none";
wholesaleItems.style.display = "none";
  homeSec.style.display = "none";
  choco.style.display = "none";grocery.style.display = "none";
  productSection11.style.display = "none";
  colldrinksec.style.display = "none";
    productSection12.style.display = "none";// ✅ FIX
    productSection14.style.display = "none";
    wholesalecools.style.display = "none"; 
    productSection23.style.display = "none";
    productSection24.style.display = "none";
    productSection25.style.display = "none";
productSection26.style.display = "none";
productSection27.style.display = "none";
productSection28.style.display = "none";
productSection29.style.display = "none";
productSection30.style.display = "none";
productSection31.style.display = "none";
productSection32.style.display = "none";
productSection40.style.display = "none";
productSection41.style.display = "none";
productSection42.style.display = "none";
productSection43.style.display = "none";
productSection44.style.display = "none";
productSection45.style.display = "none";
productSection46.style.display = "none";
productSection47.style.display = "none";
freshItems4.style.display = "none";
productSection48.style.display = "none";
productSection49.style.display = "none";
productSection50.style.display = "none";
productSection51.style.display = "none";
productSection52.style.display = "none";
productSection53.style.display = "none";
productSection54.style.display = "none";
productSection55.style.display = "none";
productSection56.style.display = "none";
productSection57.style.display = "none";
productSection58.style.display = "none";
productSection59.style.display = "none";
productSection60.style.display = "none";
productSection61.style.display = "none";
productSection62.style.display = "none";

}

else if(text === "Summer"){
    productSection.style.display = "none";   // ❌ HIDE PRODUCTS
productSection2.style.display = "none";   // ❌ HIDE 2nd row
  content.style.display = "none";
  fresh.style.display = "none";
  offer.style.display = "flex";
  productSection6.style.display = "none";
  productSection7.style.display = "none";
  productSection8.style.display = "none";
  wholesaleFruits.style.display = "none";
productSection9.style.display = "none";
productSection15.style.display = "none";
productSection16.style.display = "none";
productSection17.style.display = "none";
productSection18.style.display = "none";
productSection21.style.display = "none";
  productSection22.style.display = "none"; 
productSection19.style.display = "none";
productSection20.style.display = "none";
  freshItems.style.display = "none";
   wholesalebrand.style.display = "none";

dailyItems.style.display = "none";
productSection3.style.display = "none";
productSection4.style.display = "none";
productSection5.style.display = "none";
beautyItems.style.display = "none";
houseItems.style.display = "none";
wholesaleItems.style.display = "none";
  cool.style.display = "none";
  skin.style.display = "none";
  homeSec.style.display = "none"; 
  choco.style.display = "none"; grocery.style.display = "none"; // ✅ FIX
 productSection10.style.display = "none";
 productSection11.style.display = "none";
 colldrinksec.style.display = "none";
 productSection12.style.display = "none";
 productSection13.style.display = "none";
 productSection14.style.display = "none"; 
 productSection21.style.display = "none";
  productSection22.style.display = "none"; 
  wholesalecools.style.display = "none";
  productSection23.style.display = "none";
  productSection24.style.display = "none";
  productSection25.style.display = "none";
productSection26.style.display = "none";
productSection27.style.display = "none";
productSection28.style.display = "none";
productSection29.style.display = "none";
productSection30.style.display = "none";
productSection31.style.display = "none";
productSection32.style.display = "none";
productSection40.style.display = "none";
productSection41.style.display = "none";
productSection42.style.display = "none";
productSection43.style.display = "none";
productSection44.style.display = "none";
productSection45.style.display = "none";
productSection46.style.display = "none";
productSection47.style.display = "none";
freshItems4.style.display = "none";
productSection48.style.display = "none";
productSection49.style.display = "none";
productSection50.style.display = "none";
productSection51.style.display = "none";
productSection52.style.display = "none";
productSection53.style.display = "none";
productSection54.style.display = "none";
productSection55.style.display = "none";
productSection56.style.display = "none";
productSection57.style.display = "none";
productSection58.style.display = "none";
productSection59.style.display = "none";
productSection60.style.display = "none";
productSection61.style.display = "none";
productSection62.style.display = "none";

}

else if(text === "Cool"){
  content.style.display = "none";
  fresh.style.display = "none";
  productSection6.style.display = "none";
    productSection.style.display = "none";   // ❌ HIDE PRODUCTS
productSection2.style.display = "none";   // ❌ HIDE 2nd row
  offer.style.display = "none";
   wholesalebrand.style.display = "none";
productSection15.style.display = "block";
productSection16.style.display = "block";
productSection17.style.display = "block";
productSection18.style.display = "block";
productSection19.style.display = "block";
productSection20.style.display = "block";
  freshItems.style.display = "none";
  productSection7.style.display = "none";
  wholesaleFruits.style.display = "none";
  productSection8.style.display = "none";
    productSection10.style.display = "block";
    productSection11.style.display = "block";
productSection9.style.display = "none";
productSection12.style.display = "block";
dailyItems.style.display = "none";
colldrinksec.style.display = "block";
productSection3.style.display = "none";
productSection4.style.display = "none";
productSection5.style.display = "none";
beautyItems.style.display = "none";
houseItems.style.display = "none";
wholesaleItems.style.display = "none";
  cool.style.display = "block";
  skin.style.display = "none";
  homeSec.style.display = "none"; 
  choco.style.display = "none"; 
  grocery.style.display = "none"; 
  productSection13.style.display = "block";
  productSection14.style.display = "block"; 
  productSection21.style.display = "none";
  productSection22.style.display = "none";
  productSection23.style.display = "block";
  wholesalecools.style.display = "block"; 
  productSection24.style.display = "none";
  productSection25.style.display = "none";
productSection26.style.display = "none";
productSection27.style.display = "none";
productSection28.style.display = "none";
productSection29.style.display = "none";
productSection30.style.display = "none";
productSection31.style.display = "none";
productSection32.style.display = "none";
productSection40.style.display = "none";
productSection41.style.display = "none";
productSection42.style.display = "none";
productSection43.style.display = "none";
productSection44.style.display = "none";
productSection45.style.display = "none";
productSection46.style.display = "none";
productSection47.style.display = "none";
freshItems4.style.display = "none";
productSection48.style.display = "none";
productSection49.style.display = "none";
productSection50.style.display = "none";
productSection51.style.display = "none";
productSection52.style.display = "none";
productSection53.style.display = "none";
productSection54.style.display = "none";
productSection55.style.display = "none";
productSection56.style.display = "none";
productSection57.style.display = "none";
productSection58.style.display = "none";
productSection59.style.display = "none";
productSection60.style.display = "none";
productSection61.style.display = "none";
productSection62.style.display = "none";

}

else if(text === "Skin Care"){
  content.style.display = "none";
  fresh.style.display = "none";
    productSection.style.display = "none";   // ❌ HIDE PRODUCTS
productSection2.style.display = "none";   // ❌ HIDE 2nd row
  offer.style.display = "none";
  productSection6.style.display = "none";
  wholesaleFruits.style.display = "none";
   productSection10.style.display = "none";
  productSection7.style.display = "none";
  productSection12.style.display = "none";
  productSection8.style.display = "none";
productSection9.style.display = "none";
  cool.style.display = "none";
  skin.style.display = "block"; 
   wholesalebrand.style.display = "none";
productSection15.style.display = "none";
productSection16.style.display = "none";
productSection17.style.display = "none";
productSection18.style.display = "none";
productSection19.style.display = "none";
productSection20.style.display = "none";
  productSection3.style.display = "none";
productSection4.style.display = "none";
productSection5.style.display = "none";
  homeSec.style.display = "none";
  freshItems.style.display = "none";
dailyItems.style.display = "none";
beautyItems.style.display = "none";
colldrinksec.style.display = "none";
houseItems.style.display = "none";
wholesaleItems.style.display = "none";
  choco.style.display = "none";
  grocery.style.display = "none"; // ✅ only here visible
  productSection11.style.display = "none"; 
  productSection13.style.display = "none";
  productSection14.style.display = "none"; 
  productSection21.style.display = "none";
  productSection22.style.display = "none"; 
  wholesalecools.style.display = "none";
  productSection23.style.display = "none";
  productSection24.style.display = "none";
  productSection25.style.display = "none";
productSection26.style.display = "none";
productSection27.style.display = "none";
productSection28.style.display = "none";
productSection29.style.display = "none";
productSection30.style.display = "none";
productSection31.style.display = "none";
productSection32.style.display = "none";
productSection40.style.display = "block";
productSection41.style.display = "block";
productSection42.style.display = "block";
productSection43.style.display = "block";
productSection44.style.display = "block";
productSection45.style.display = "block";
productSection46.style.display = "block";
productSection47.style.display = "block";
freshItems4.style.display = "none";
productSection48.style.display = "none";
productSection49.style.display = "none";
productSection50.style.display = "none";
productSection51.style.display = "none";
productSection52.style.display = "none";
productSection53.style.display = "none";
productSection54.style.display = "none";
productSection55.style.display = "none";
productSection56.style.display = "block";
productSection57.style.display = "none";
productSection58.style.display = "none";
productSection59.style.display = "none";
productSection60.style.display = "none";
productSection61.style.display = "none";
productSection62.style.display = "none";

}

else if(text === "Home"){
  content.style.display = "none";
  fresh.style.display = "none";
  productSection6.style.display = "none";
  offer.style.display = "none";
  productSection12.style.display = "none";
  productSection3.style.display = "none";
  productSection7.style.display = "none";
  wholesaleFruits.style.display = "none";
   productSection10.style.display = "none";
  productSection8.style.display = "none";
  colldrinksec.style.display = "none";
productSection9.style.display = "none";
productSection4.style.display = "none";
productSection5.style.display = "none";
  cool.style.display = "none";
   wholesalebrand.style.display = "none";
productSection15.style.display = "none";
productSection16.style.display = "none";
productSection17.style.display = "none";
productSection18.style.display = "none";
productSection19.style.display = "none";
productSection20.style.display = "none";
  freshItems.style.display = "none";
dailyItems.style.display = "none";
beautyItems.style.display = "none";
houseItems.style.display = "none";
productSection13.style.display = "none";
wholesaleItems.style.display = "none";
  skin.style.display = "none";
    productSection.style.display = "none";   // ❌ HIDE PRODUCTS
productSection2.style.display = "none";   // ❌ HIDE 2nd row
  homeSec.style.display = "block";
  choco.style.display = "none";
  grocery.style.display = "none";
  productSection11.style.display = "none"; 
  productSection14.style.display = "none"; 
  productSection21.style.display = "none";
  productSection22.style.display = "none"; 
  wholesalecools.style.display = "none";
  productSection23.style.display = "none";
  productSection24.style.display = "none";
  productSection25.style.display = "none";
productSection26.style.display = "none";
productSection27.style.display = "none";
productSection28.style.display = "none";
productSection29.style.display = "none";
productSection30.style.display = "none";
productSection31.style.display = "none";
productSection32.style.display = "none";
productSection40.style.display = "none";
productSection41.style.display = "none";
productSection42.style.display = "none";
productSection43.style.display = "none";
productSection44.style.display = "none";
productSection45.style.display = "none";
productSection46.style.display = "none";
productSection47.style.display = "none";
freshItems4.style.display = "none";
productSection48.style.display = "none";
productSection49.style.display = "none";
productSection50.style.display = "none";
productSection51.style.display = "none";
productSection52.style.display = "none";
productSection53.style.display = "none";
productSection54.style.display = "none";
productSection55.style.display = "none";
productSection56.style.display = "none";
productSection57.style.display = "none";
productSection58.style.display = "none";
productSection59.style.display = "none";
productSection60.style.display = "none";
productSection61.style.display = "none";
productSection62.style.display = "none";

}
else if(text === "Chocolates"){
  content.style.display = "none";
  fresh.style.display = "none";
  productSection12.style.display = "none";
  productSection7.style.display = "none";
   productSection10.style.display = "none";
    productSection.style.display = "none";   // ❌ HIDE PRODUCTS
productSection2.style.display = "none";   // ❌ HIDE 2nd row
  offer.style.display = "none";
  productSection21.style.display = "block";
  productSection22.style.display = "block"; 
  wholesaleFruits.style.display = "none";
  cool.style.display = "none";
   wholesalebrand.style.display = "none";
productSection15.style.display = "none";
productSection16.style.display = "none";
productSection17.style.display = "none";
productSection18.style.display = "none";
productSection19.style.display = "none";
productSection20.style.display = "none";
  colldrinksec.style.display = "none";
  productSection6.style.display = "none";
  productSection3.style.display = "none";
productSection4.style.display = "none";
productSection5.style.display = "none";
  skin.style.display = "none";
  homeSec.style.display = "none";
  choco.style.display = "block";
  grocery.style.display = "none";
  freshItems.style.display = "none";
dailyItems.style.display = "none";
beautyItems.style.display = "none";
houseItems.style.display = "none";
wholesaleItems.style.display = "none";
productSection11.style.display = "none"; 
productSection13.style.display = "none";
productSection14.style.display = "none"; 
wholesalecools.style.display = "none";
productSection8.style.display = "none";
productSection9.style.display = "none";
productSection23.style.display = "none";
productSection24.style.display = "block";
productSection25.style.display = "none";
productSection26.style.display = "none";
productSection27.style.display = "none";
productSection28.style.display = "none";
productSection29.style.display = "none";
productSection30.style.display = "none";
productSection31.style.display = "none";
productSection32.style.display = "none";
productSection40.style.display = "none";
productSection41.style.display = "none";
productSection42.style.display = "none";
productSection43.style.display = "none";
productSection44.style.display = "none";
productSection45.style.display = "none";
productSection46.style.display = "none";
productSection47.style.display = "none";
freshItems4.style.display = "block";
productSection48.style.display = "block";
productSection49.style.display = "block";
productSection50.style.display = "block";
productSection51.style.display = "block";
productSection52.style.display = "block";
productSection53.style.display = "block";
productSection54.style.display = "block";
productSection55.style.display = "block";
productSection56.style.display = "none";
productSection57.style.display = "none";
productSection58.style.display = "none";
productSection59.style.display = "none";
productSection60.style.display = "none";
productSection61.style.display = "none";
productSection62.style.display = "none";

}
else if(text === "Groceries"){
  content.style.display = "none";
  fresh.style.display = "none";
  productSection12.style.display = "none";
  productSection7.style.display = "none";
  offer.style.display = "none";
  productSection21.style.display = "none";
  productSection22.style.display = "none"; 
   wholesalebrand.style.display = "none";
productSection15.style.display = "none";
productSection16.style.display = "none";
productSection17.style.display = "none";
productSection18.style.display = "none";
productSection19.style.display = "none";
productSection20.style.display = "none";
   productSection10.style.display = "none";
  productSection3.style.display = "none";
productSection4.style.display = "none";
colldrinksec.style.display = "none";
wholesaleFruits.style.display = "none";
productSection5.style.display = "none";
  cool.style.display = "none";
  productSection8.style.display = "none";
productSection9.style.display = "none";
  productSection6.style.display = "none";
  productSection13.style.display = "none";
  skin.style.display = "none";
  homeSec.style.display = "none";
    productSection.style.display = "none";   // ❌ HIDE PRODUCTS
productSection2.style.display = "none";   // ❌ HIDE 2nd row
  choco.style.display = "none";
  grocery.style.display = "block";
  freshItems.style.display = "none";
dailyItems.style.display = "none";
beautyItems.style.display = "none";
houseItems.style.display = "none";
wholesaleItems.style.display = "none";
productSection11.style.display = "none"; 
productSection14.style.display = "none"; 
wholesalecools.style.display = "none";
productSection23.style.display = "none";
productSection24.style.display = "none";
productSection25.style.display = "block";
productSection26.style.display = "block";
productSection27.style.display = "block";

productSection28.style.display = "block";
productSection29.style.display = "block";
productSection30.style.display = "block";
productSection31.style.display = "block";
productSection32.style.display = "block";
productSection40.style.display = "none";
productSection41.style.display = "none";
productSection42.style.display = "none";
productSection43.style.display = "none";
productSection44.style.display = "none";
productSection45.style.display = "none";
productSection46.style.display = "none";
productSection47.style.display = "none";
freshItems4.style.display = "none";
productSection48.style.display = "none";
productSection49.style.display = "none";
productSection50.style.display = "none";
productSection51.style.display = "none";
productSection52.style.display = "none";
productSection53.style.display = "none";
productSection54.style.display = "none";
productSection55.style.display = "none";
productSection56.style.display = "none";
productSection57.style.display = "block";
productSection58.style.display = "block";
productSection59.style.display = "block";
productSection60.style.display = "block";
productSection61.style.display = "block";
productSection62.style.display = "block";

}
else{
  content.style.display = "none";
   wholesalebrand.style.display = "none";
productSection15.style.display = "none";
productSection16.style.display = "none";
productSection17.style.display = "none";
productSection18.style.display = "none";
productSection19.style.display = "none";
productSection20.style.display = "none";
  fresh.style.display = "none";
  offer.style.display = "none";
  productSection12.style.display = "none";
  colldrinksec.style.display = "none";
   productSection10.style.display = "none";
  wholesaleFruits.style.display = "none";
  productSection7.style.display = "none";
  freshItems.style.display = "none";
dailyItems.style.display = "none";
beautyItems.style.display = "none";
productSection8.style.display = "none";
productSection9.style.display = "none";
productSection6.style.display = "none";
productSection3.style.display = "none";
productSection13.style.display = "none";
productSection4.style.display = "none";
productSection5.style.display = "none";
houseItems.style.display = "none";
wholesaleItems.style.display = "none";
  cool.style.display = "none";
  skin.style.display = "none";
    productSection.style.display = "none";   // ❌ HIDE PRODUCTS
  grocery.style.display = "none";
  homeSec.style.display = "none";  
  choco.style.display = "none"; 
  productSection11.style.display = "none"; 
  productSection10.style.display = "none";
  productSection14.style.display = "none";  
  productSection21.style.display = "none";
  wholesalecools.style.display = "none";
  productSection22.style.display = "none"; 
  productSection23.style.display = "none";
  productSection24.style.display = "none";
  productSection25.style.display = "none";
productSection26.style.display = "none";
productSection27.style.display = "none";
productSection28.style.display = "none";
productSection29.style.display = "none";
productSection30.style.display = "none";
productSection31.style.display = "none";
productSection32.style.display = "none";
productSection40.style.display = "none";
productSection41.style.display = "none";
productSection42.style.display = "none";
productSection43.style.display = "none";
productSection44.style.display = "none";
productSection45.style.display = "none";
productSection46.style.display = "none";
productSection47.style.display = "none";
freshItems4.style.display = "none";
productSection48.style.display = "none";
productSection49.style.display = "none";
productSection50.style.display = "none";
productSection51.style.display = "none";
productSection52.style.display = "none";
productSection53.style.display = "none";
productSection54.style.display = "none";
productSection55.style.display = "none";
productSection56.style.display = "none";
productSection57.style.display = "block";
productSection58.style.display = "block";
productSection59.style.display = "block";
productSection60.style.display = "block";
productSection61.style.display = "block";
productSection62.style.display = "block";


}
  });
});
const leafContainer = document.querySelector(".leaves");

for(let i=0; i<25; i++){
  const leaf = document.createElement("span");

  leaf.style.left = Math.random() * 100 + "%";
  leaf.style.animationDuration = (6 + Math.random()*6) + "s";
  leaf.style.animationDelay = "0s"; // ✅ start immediately

  leafContainer.appendChild(leaf);
}
// default load
document.querySelector(".catItem").click();

const fruits = document.querySelectorAll(".fruit");
const sparkleContainer = document.querySelector(".sparkleContainer");
const freshSection = document.getElementById("freshSection");

setInterval(() => {

  const sectionRect = freshSection.getBoundingClientRect();

  fruits.forEach(fruit => {

    const rect = fruit.getBoundingClientRect();

    // ✅ correct bottom detection
    if(rect.bottom > sectionRect.bottom - 10){

      const sparkle = document.createElement("span");
      sparkle.className = "sparkle";
      sparkle.innerText = ["✨","⭐","💫"][Math.floor(Math.random()*3)];

      sparkle.style.left = (rect.left - sectionRect.left) + "px";
      sparkle.style.top = (rect.bottom - sectionRect.top - 20) + "px";

      sparkleContainer.appendChild(sparkle);

      setTimeout(()=> sparkle.remove(), 600);
    }

  });

}, 200);
const confettiContainer = document.querySelector(".confettiContainer");

function createConfetti(){

  for(let i=0;i<40;i++){

    const conf = document.createElement("div");
    conf.className = "confetti";

    // random position
    conf.style.left = Math.random()*100 + "%";

    // random color
    conf.style.background = [
      "#ff3d00","#ff6a00","#ffb300","#ffd54f","#ff4081","#7c4dff"
    ][Math.floor(Math.random()*6)];

    // random size
    conf.style.width = (4 + Math.random()*6) + "px";
    conf.style.height = (6 + Math.random()*8) + "px";

    // random speed
    conf.style.animationDuration = (1 + Math.random()*1.5) + "s";

    confettiContainer.appendChild(conf);

    setTimeout(()=> conf.remove(), 1500);
  }
}

/* 🔁 LOOP (continuous explosion) */
setInterval(()=>{
  createConfetti();
  if(Math.random() < 0.5) createConfetti(); // double burst sometimes
},700);

const rainContainer = document.querySelector(".rain");

function createRain(){

  for(let i=0;i<20;i++){

    const drop = document.createElement("div");
    drop.className = "drop";

   drop.style.left = Math.random()*100 + "%";
    drop.style.animationDuration = (0.8 + Math.random()*0.7) + "s";

    rainContainer.appendChild(drop);

    setTimeout(()=> drop.remove(), 1500);
  }
}

/* continuous rain */
setInterval(createRain, 200);
const lightning = document.querySelector(".lightning");

function triggerLightning(){

  lightning.style.opacity = "0.8";

  setTimeout(()=>{
    lightning.style.opacity = "0";
  },100);

}
function thunder(){

  triggerLightning();

  setTimeout(triggerLightning, 150); // second flash
  setTimeout(triggerLightning, 300); // third flash

}

/* random thunder */
setInterval(()=>{
  thunder();
}, 3000);

const glowContainer = document.querySelector(".glowContainer");

function createGlow(){

  for(let i=0;i<15;i++){

    const g = document.createElement("div");
    g.className = "glow";

    g.style.left = Math.random()*100 + "%";

    g.style.animationDuration = (2 + Math.random()*2) + "s";

    g.style.width = (6 + Math.random()*6) + "px";
    g.style.height = g.style.width;

    glowContainer.appendChild(g);

    setTimeout(()=> g.remove(), 3000);
  }
}

/* continuous glow */
setInterval(createGlow, 800);
const navItems = document.querySelectorAll(".navItem");

navItems.forEach(item=>{
  item.addEventListener("click",()=>{

    navItems.forEach(i=>i.classList.remove("active"));
    item.classList.add("active");

    const text = item.innerText.trim();

    if(text.includes("Home")){
      window.scrollTo({top:0, behavior:"smooth"});
    }

    if(text.toLowerCase().includes("categories")){
  window.location.href = "categories.html";
  return;
}

    if(text.toLowerCase().includes("help")){
  window.location.href = "help.html";
}

    if(text.includes("Video")){
      alert("Video banner coming soon 🎬");
    }

  });
});


let lastScroll = 0;

const bottomNav = document.querySelector(".bottomNav");
const cartBar = document.querySelector(".cartBar");
const miniCart = document.querySelector(".miniCart"); // 🔥 ADD THIS

window.addEventListener("scroll", () => {

  let currentScroll = window.pageYOffset;

  if(currentScroll > lastScroll){
    // 🔻 scrolling DOWN → hide nav
    bottomNav.classList.add("hide");

    // ✅ move cart down
    cartBar.style.bottom = "10px";

    // ✅ move mini cart down with it
    miniCart.style.bottom = "70px";

  } else {
    // 🔺 scrolling UP → show nav
    bottomNav.classList.remove("hide");

    // ✅ move cart above nav
    cartBar.style.bottom = "75px";

    // ✅ move mini cart above cart bar
    miniCart.style.bottom = "140px";
  }

  lastScroll = currentScroll;
});
const navVideo = document.querySelector(".videoNav video");

if(navVideo){
  navVideo.play().catch(()=>{
    // fallback if autoplay blocked
    navVideo.muted = true;
    navVideo.play();
  });
}
async function loadProducts(){

  const { data, error } = await supabase
    .from("all_products")
    .select("*")
    .in("id", [2,3,4,5,6,7]);

  if(error){
    console.log(error);
    return;
  }

  const grid = document.getElementById("productGrid");
  if(!grid) return;   // prevents error if removed

  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["all_products_" + item.id] = item;    

    const card = document.createElement("div");
    card.className = "productCard";

    card.innerHTML = `
  <div class="imgWrap">
    <img src="${item.image1}">

    <!-- ✅ SAME AS loadProducts2 -->
    <div class="cartControl" 
     data-id="${item.id}" 
     data-table="all_products">
      <div class="addBtn2">+</div>
    </div>

  </div>

  <div class="pName">${item.name}</div>

  <div class="pQty">${item.quantity} ${item.unit}</div>

  <div class="pPrice">
    ₹${item.discount_price}
    <span>₹${item.original_price}</span>
  </div>
`;



   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "all_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();

}
function openPopup(item){
lockBodyScroll();
  const table = item.table || "all_products";

  const popup = document.getElementById("popup");
  const dataDiv = document.getElementById("popupData");

  const images = [item.image1, item.image2, item.image3].filter(Boolean);

  dataDiv.innerHTML = `
    <!-- TOP ICONS -->
<div class="topIcons">
  <div class="iconBtn" onclick="closePopup()">
  <i class="fa-solid fa-chevron-down"></i>
</div>
</div>
    <!-- IMAGE -->
    <div class="imageSlider" id="slider">

      
      ${images.map(img => `<img src="${img}">`).join("")}

    </div>

    <!-- DOTS -->
    <div class="dots">
      ${images.map((_,i)=> `<div class="dot ${i===0?"active":""}"></div>`).join("")}
    </div>

    <div class="popupContent">

   <div class="nameTopRow">

  <div class="nameRow">
    <h2>${item.name}</h2>
    <span class="brandInline">${item.brand || ""}</span>
  </div>

  <div class="ratingBox">
    <i class="fa-solid fa-star"></i> ${item.rating || "0"}
  </div>

</div>
<div class="shortDesc">${item.short_desc || ""}</div>

      <!-- PRICE + ADD -->
    <!-- QUANTITY -->
<div class="qtyText">
  ${item.quantity} ${item.unit}
</div>

<!-- PRICE + ADD -->
<div class="topRow">
  <div class="priceRow">
    ₹${item.discount_price}
    <span class="strike">₹${item.original_price}</span>
  </div>

  <div class="popupCartControl" 
     data-id="${item.id}" 
     data-table="${table}">
  <button class="addBigBtn">ADD</button>
</div>
</div>

<div class="infoBox">

  <div class="infoItem">
    <div class="emoji">⏱️</div>
    <div class="infoText">72 hrs<br><span>Easy Return</span></div>
  </div>

  <div class="infoItem">
    <div class="emoji">🚀</div>
    <div class="infoText">Fast Delivery<br><span>Quick</span></div>
  </div>

  <div class="infoItem">
    <div class="emoji">📞</div>
    <div class="infoText">24/7 Support<br><span>Help Anytime</span></div>
  </div>

</div>
      <!-- RATING -->
      
     

      <!-- INGREDIENTS -->
     <div class="box">
  <b>Ingredients</b>

  <table class="ingTable">
    ${
      (() => {
        let arr = [];

        try {
          arr = JSON.parse(item.ingredients || "[]");
        } catch(e) {
          return "<tr><td>-</td></tr>";
        }

        let rows = "";

        for(let i = 0; i < arr.length; i += 2){
          rows += `
            <tr>
              <td>${arr[i] || ""}</td>
              <td>${arr[i+1] || ""}</td>
            </tr>
          `;
        }

        return rows;
      })()
    }
  </table>

</div>
 <!-- LONG DESC -->
      <div class="box">
        <b>Description</b><br>
        ${item.long_desc || "-"}
      </div>

      <!-- HOW TO USE -->
     <div class="box">
  <b>How to Use</b>

  <ul class="pointList">
    ${
      (item.how_to_use || "")
        .split(",")
        .map(i => `<li>${i.trim()}</li>`)
        .join("")
    }
  </ul>
</div>

      <!-- BENEFITS -->
     <div class="box">
  <b>Benefits</b>

  <div class="benefitList">
    ${
      (item.benefits || "")
        .split(",")
        .map(i => `
          <div class="benefitItem">
            <span class="tick">✔</span>
            <span>${i.trim()}</span>
          </div>
        `).join("")
    }
  </div>

</div>

      <!-- ADDITIONAL -->
     <div class="infoPanelNew">
  <b>Additional Info</b>

  <div class="infoListNew">
    ${
      (item.additional_info || "")
        .split(",")
        .map(i => {
          const parts = i.split(":");
          return `
            <div class="infoRowNew">
              <div class="infoKeyNew">${parts[0] || ""}</div>
              <div class="infoValNew">${parts[1] || ""}</div>
            </div>
          `;
        }).join("")
    }
  </div>
</div>
<div class="buyNowWrap">
  <button class="buyNowBtn" id="buyNowBtn">
  Buy Now • ₹${item.discount_price}
  <span>₹${item.original_price}</span>
</button>
</div>
    </div>

  `;

  popup.style.display = "flex";
  const buyBtn = document.getElementById("buyNowBtn");

if(buyBtn){
  buyBtn.onclick = function(){

    console.log("🛒 Buy Now clicked");

    const key = table + "_" + item.id;

    let cart = JSON.parse(localStorage.getItem("cart") || "{}");

    cart[key] = (cart[key] || 0) + 1;

    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("✅ Added to cart:", key);

    // 🔥 update everything
    renderCartItems();   // popup
    updateCartBar();     // 🔥 FIX → cart bar

    // 🔥 close product popup
    closePopup();

    // 🔥 open cart popup
    document.getElementById("cartPopup").classList.add("show");
    document.body.classList.add("popup-open");
  };
}

requestAnimationFrame(()=>{
  popup.classList.add("show");
});

console.log("✅ Popup opened");

const preview = document.getElementById("imgPreview");
const previewImg = document.getElementById("previewImg");

const imgs = document.querySelectorAll("#slider img");

console.log("Images found:", imgs.length);

imgs.forEach((img, i) => {

  console.log("Binding image", i, img.src);

  img.onclick = function(){
    console.log("🔥 IMAGE CLICKED:", this.src);

    if(!preview || !previewImg){
      console.log("❌ preview elements missing");
      return;
    }

    // 🔥 set image
    previewImg.src = this.src;

    // 🔥 open overlay (clean way)
    preview.classList.add("active");

    console.log("✅ Preview opened");
  };

});
initAllUI();
  // 🔥 DOTS WORKING
  setTimeout(()=>{
    const slider = document.getElementById("slider");
    const dots = document.querySelectorAll(".dot");

    slider.addEventListener("scroll", () => {

      const index = Math.round(slider.scrollLeft / slider.clientWidth);

      dots.forEach(d => d.classList.remove("active"));

      if(dots[index]){
        dots[index].classList.add("active");
      }

    });

  },100);
}
function closePopup(){
  popup.classList.remove("show");

  setTimeout(()=>{
    popup.style.display = "none";
    unlockBodyScroll();
  },300);
  
}
loadProducts();
window.addEventListener("load", () => {
  setTimeout(() => {
    updateCartBar();   // 🔥 FORCE LOAD AFTER EVERYTHING READY
  }, 300);
});

async function loadProducts2(){

  const { data } = await supabase
    .from("all_products")
    .select("*")
    .in("id", [8,9,10,11,14,15]);

  const grid = document.getElementById("productGrid2");
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["all_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="all_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
<div class="brand2">${item.brand || ""}</div>
      <div class="priceRow2">

  <div class="pPrice2">
    ₹${item.discount_price}
    <span>₹${item.original_price}</span>
  </div>

  <div class="ratingGreen">
    <i class="fa-solid fa-star"></i>
    ${item.rating || "0"}
  </div>

</div>
    `;

   card.addEventListener("click", function(e){

  // ❌ block + button
  if(e.target.closest(".cartControl")){
    return;
  }

  const img = card.querySelector(".imgWrap2");
  const rect = img.getBoundingClientRect();

  const clickY = e.clientY - rect.top;

  // 🎯 EXACT HALF of image
  const half = rect.height / 2;

  // 🔴 TOP HALF → NO popup
  if(clickY < half){
    return;
  }

  // 🟡 BOTTOM HALF → popup
  openPopup({
    ...item,
    table: item.table || "all_products"
  });

});

    grid.appendChild(card);
  });
  initAllUI();
}
loadProducts2();




async function loadProducts3(){

  const { data } = await supabase
    .from("all_products")
    .select("*")
    .in("id", [16,17,18,19,20,21]);

  const grid = document.getElementById("productGrid3");
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["all_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">

        <div class="cartControl" 
          data-id="${item.id}" 
          data-table="all_products">
          <div class="addBtn2">+</div>
        </div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

    // ✅ NEW CLICK LOGIC
    card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

      // 🟡 bottom half + text → popup
      openPopup({
        ...item,
        table: item.table || "all_products"
      });

    });

    grid.appendChild(card);
  });

  initAllUI();
}

loadProducts3();
async function loadProducts4(){

  const { data } = await supabase
    .from("all_products")
    .select("*")
    .in("id", [22,23,24,25,26,27]);   // ✅ new IDs

  const grid = document.getElementById("productGrid4"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["all_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="all_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

    card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "all_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts4(); // ✅ call function

async function loadProducts5(){

  const { data } = await supabase
    .from("all_products")
    .select("*")
    .in("id", [28,29,30,31,32,33]);   // ✅ new IDs

  const grid = document.getElementById("productGrid5"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["all_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
    data-table="all_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;
    const addBtn = card.querySelector(".addBtn2");

// ✅ button always clickable
// ✅ button always clickable
// addBtn.addEventListener("click", function(e){
  // e.stopPropagation();
  // console.log("✅ PLUS CLICKED");
// });

// 🔥 FIXED HALF AREA BLOCK
const imgWrap = addBtn.parentElement;

imgWrap.addEventListener("click", function(e){

  // ✅ VERY IMPORTANT → allow + click
  if(e.target === addBtn){
    return;
  }

  const rect = this.getBoundingClientRect();
  const clickY = e.clientY - rect.top;

  const half = rect.height / 2;

  // ❌ block only top half
  if(clickY < half){
    e.stopPropagation();
  }

});

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "all_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts5(); 


// ✅ fresh Section
 

async function loadProducts7(){

  const { data } = await supabase
    .from("fresh_products")
    .select("*")
    .in("id", [10,11,12,13,14]);   // ✅ new IDs

  const grid = document.getElementById("productGrid7"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["fresh_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
        <div class="bottomShade"></div>
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="fresh_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

    card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "fresh_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts7(); 

async function loadProducts8(){

  const { data } = await supabase
    .from("fresh_products")
    .select("*")
    .in("id", [15,16,17,18,19]);   // ✅ new IDs

  const grid = document.getElementById("productGrid8"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["fresh_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="fresh_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

    card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "fresh_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts8(); 

async function loadProducts9(){

  const { data } = await supabase
    .from("fresh_products")
    .select("*")
    .in("id", [20,21,22,9,2]);   // ✅ new IDs

  const grid = document.getElementById("productGrid9"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["fresh_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="fresh_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "fresh_products"
  
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts9(); 
// ✅ cool starts here 

async function loadProducts11(){

  const { data } = await supabase
    .from("cool_drinks_products")
    .select("*")
    .in("id", [18,19,20,21,22,23,79,80]); // ✅ new IDs

  const grid = document.getElementById("productGrid11"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["cool_drinks_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="cool_drinks_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

    card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "cool_drinks_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts11(); 


async function loadProducts12(){

  const { data } = await supabase
    .from("cool_drinks_products")
    .select("*")
    .in("id", [13,14,15,16,37,24]);   // ✅ new IDs

  const grid = document.getElementById("productGrid12"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["cool_drinks_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="cool_drinks_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "cool_drinks_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts12(); 

async function loadProducts13(){

  const { data } = await supabase
    .from("cool_drinks_products")
    .select("*")
    .in("id", [25,26,27,28,29,30,31]);   // ✅ new IDs

  const grid = document.getElementById("productGrid13"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["cool_drinks_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="cool_drinks_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

    card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "cool_drinks_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts13(); 

async function loadProducts14(){

  const { data } = await supabase
    .from("cool_drinks_products")
    .select("*")
    .in("id", [32,33,34,35,36,39]);   // ✅ new IDs

  const grid = document.getElementById("productGrid14"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["cool_drinks_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="cool_drinks_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

    card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "cool_drinks_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts14(); 


async function loadProducts15(){

  const { data } = await supabase
    .from("cool_drinks_products")
    .select("*")
    .in("id", [40,41,42,43,44,46,47]);   // ✅ new IDs

  const grid = document.getElementById("productGrid15"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["cool_drinks_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="cool_drinks_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

    card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "cool_drinks_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts15(); 


async function loadProducts16(){

  const { data } = await supabase
    .from("cool_drinks_products")
    .select("*")
    .in("id", [48,49,50,51,52,53,54]);   // ✅ new IDs

  const grid = document.getElementById("productGrid16"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["cool_drinks_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="cool_drinks_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

    card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }
  openPopup({
  ...item,
  table: item.table || "cool_drinks_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts16(); 


async function loadProducts17(){

  const { data } = await supabase
    .from("cool_drinks_products")
    .select("*")
    .in("id", [55,56,57,58,59,60,61]);   // ✅ new IDs

  const grid = document.getElementById("productGrid17"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["cool_drinks_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="cool_drinks_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

    card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "cool_drinks_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts17();


async function loadProducts18(){

  const { data } = await supabase
    .from("cool_drinks_products")
    .select("*")
    .in("id", [62,63,64,65,66,67,68]);  // ✅ new IDs

  const grid = document.getElementById("productGrid18"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["cool_drinks_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="cool_drinks_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

    card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "cool_drinks_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts18();






async function loadProducts19(){

  const { data } = await supabase
    .from("cool_drinks_products")
    .select("*")
    .in("id", [3,5,8,9,10,14,16,67]);   // ✅ new IDs

  const grid = document.getElementById("productGrid19"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["cool_drinks_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="cool_drinks_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "cool_drinks_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts19(); 


async function loadProducts20(){

  const { data } = await supabase
    .from("cool_drinks_products")
    .select("*")
    .in("id", [22,23,24,25,26,69,70,71]);   // ✅ new IDs

  const grid = document.getElementById("productGrid20"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["cool_drinks_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
    data-table="cool_drinks_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "cool_drinks_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts20(); 


 


async function loadProducts22(){

  const { data } = await supabase
    .from("chocolate_products")
    .select("*")
    .in("id", [15,16,17,18,19,20,21,22,24]);   // ✅ new IDs

  const grid = document.getElementById("productGrid22"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["chocolate_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="chocolate_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "chocolate_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts22(); 


async function loadProducts23(){

  const { data } = await supabase
    .from("cool_drinks_products")
    .select("*")
    .in("id", [72,73,74,75,76,77,78,81,82]);   // ✅ new IDs

  const grid = document.getElementById("productGrid23"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["chocolate_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="cool_drinks_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "cool_drinks_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts23(); 





async function loadProducts24(){

  const { data } = await supabase
    .from("chocolate_products")
    .select("*")
    .in("id", [25,26,27,28,29,30,31]);   // ✅ new IDs

  const grid = document.getElementById("productGrid24"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["chocolate_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="chocolate_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "chocolate_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts24(); 






async function loadProducts26(){

  const { data } = await supabase
    .from("grocery_products")
    .select("*")
    .in("id", [29,30,31,32,33,34,35,36,37]);   // ✅ new IDs

  const grid = document.getElementById("productGrid26"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["grocery_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="grocery_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;
const addBtn = card.querySelector(".addBtn2");


// 🔥 FIXED HALF AREA BLOCK
const imgWrap = addBtn.parentElement;

imgWrap.addEventListener("click", function(e){

  // ✅ VERY IMPORTANT → allow + click
  if(e.target === addBtn){
    return;
  }

  const rect = this.getBoundingClientRect();
  const clickY = e.clientY - rect.top;

  const half = rect.height / 2;

  // ❌ block only top half
  if(clickY < half){
    e.stopPropagation();
  }

});
   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "grocery_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
  
}

loadProducts26(); 




async function loadProducts27(){

  const { data } = await supabase
    .from("grocery_products")
    .select("*")
    .in("id", [3,4,5,38,39,40,41,42,43,44]);   // ✅ new IDs

  const grid = document.getElementById("productGrid27"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["grocery_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="grocery_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;
const addBtn = card.querySelector(".addBtn2");


// 🔥 FIXED HALF AREA BLOCK
const imgWrap = addBtn.parentElement;

imgWrap.addEventListener("click", function(e){

  // ✅ VERY IMPORTANT → allow + click
  if(e.target === addBtn){
    return;
  }

  const rect = this.getBoundingClientRect();
  const clickY = e.clientY - rect.top;

  const half = rect.height / 2;

  // ❌ block only top half
  if(clickY < half){
    e.stopPropagation();
  }

});
   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "grocery_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts27(); 


async function loadProducts28(){

  const { data } = await supabase
    .from("grocery_products")
    .select("*")
    .in("id", [45,46,47,48,49,50,51,52,20,21,22,28,53]);   // ✅ new IDs

  const grid = document.getElementById("productGrid28"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["grocery_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="grocery_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "grocery_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts28(); 

async function loadProducts29(){

  const { data } = await supabase
    .from("grocery_products")
    .select("*")
    .in("id", [54,55,56,57,58,59,60,61,63,23,24,25,26,27]);   // ✅ new IDs

  const grid = document.getElementById("productGrid29"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["grocery_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="grocery_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;
const addBtn = card.querySelector(".addBtn2");


// 🔥 FIXED HALF AREA BLOCK
const imgWrap = addBtn.parentElement;

imgWrap.addEventListener("click", function(e){

  // ✅ VERY IMPORTANT → allow + click
  if(e.target === addBtn){
    return;
  }

  const rect = this.getBoundingClientRect();
  const clickY = e.clientY - rect.top;

  const half = rect.height / 2;

  // ❌ block only top half
  if(clickY < half){
    e.stopPropagation();
  }

});
   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "grocery_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts29(); 

async function loadProducts30(){

  const { data } = await supabase
    .from("grocery_products")
    .select("*")
    .in("id", [64,65,66,67,68,69,70,71,141,142,143]);   // ✅ new IDs

  const grid = document.getElementById("productGrid30"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["grocery_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="grocery_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "grocery_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts30(); 


async function loadProducts31(){

  const { data } = await supabase
    .from("grocery_products")
    .select("*")
    .in("id", [72,73,74,75,76,77,78,79,148,149,150]);   // ✅ new IDs

  const grid = document.getElementById("productGrid31"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["grocery_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="grocery_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "grocery_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts31(); 





async function loadProducts41(){

  const { data } = await supabase
    .from("skincare_products")
    .select("*")
    .in("id", [8,9,10,11,12,13,14]);   // ✅ new IDs

  const grid = document.getElementById("productGrid41"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["skincare_products_" + item.id] = item; //chnage
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="skincare_products"> // chnage
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "skincare_products" //chnage
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts41(); //chnage



async function loadProducts42(){

  const { data } = await supabase
    .from("skincare_products")
    .select("*")
    .in("id", [15,16,17,18,19,20,21]);   // ✅ new IDs

  const grid = document.getElementById("productGrid42"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["skincare_products_" + item.id] = item; //chnage
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="skincare_products"> // chnage
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "skincare_products" //chnage
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts42(); //chnage



async function loadProducts43(){

  const { data } = await supabase
    .from("skincare_products")
    .select("*")
    .in("id", [22,23,24,25,26,27,28,29]);   // ✅ new IDs

  const grid = document.getElementById("productGrid43"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["skincare_products_" + item.id] = item; //chnage
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="skincare_products"> // chnage
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "skincare_products" //chnage
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts43(); //chnage



async function loadProducts44(){

  const { data } = await supabase
    .from("skincare_products")
    .select("*")
    .in("id", [30,31,32,33,34,35,36]);   // ✅ new IDs

  const grid = document.getElementById("productGrid44"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["skincare_products_" + item.id] = item; //chnage
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="skincare_products"> // chnage
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "skincare_products" //chnage
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts44(); //chnage



async function loadProducts45(){

  const { data } = await supabase
    .from("skincare_products")
    .select("*")
    .in("id", [37,38,39,40,41,42,43,44]);   // ✅ new IDs

  const grid = document.getElementById("productGrid45"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["skincare_products_" + item.id] = item; //chnage
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="skincare_products"> // chnage
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "skincare_products" //chnage
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts45(); //chnage




async function loadProducts46(){

  const { data } = await supabase
    .from("skincare_products")
    .select("*")
    .in("id", [45,46,47,48,49,50,51,52,53]);   // ✅ new IDs

  const grid = document.getElementById("productGrid46"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["skincare_products_" + item.id] = item; //chnage
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="skincare_products"> // chnage
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "skincare_products" //chnage
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts46(); //chnage





async function loadProducts47(){

  const { data } = await supabase
    .from("skincare_products")
    .select("*")
    .in("id", [54,55,56,57,58,59,60,61]);   // ✅ new IDs

  const grid = document.getElementById("productGrid47"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["skincare_products_" + item.id] = item; //chnage
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="skincare_products"> // chnage
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "skincare_products" //chnage
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts47(); //chnage


async function loadProducts48(){

  const { data } = await supabase
    .from("chocolate_products")
    .select("*")
    .in("id", [32,33,34,35,36,37,38,39,40]);   // ✅ new IDs

  const grid = document.getElementById("productGrid48"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["chocolate_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="chocolate_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "chocolate_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts48(); 




async function loadProducts49(){

  const { data } = await supabase
    .from("chocolate_products")
    .select("*")
    .in("id", [41,42,43,44,45,46,47,48]);   // ✅ new IDs

  const grid = document.getElementById("productGrid49"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["chocolate_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="chocolate_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "chocolate_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts49(); 


async function loadProducts50(){

  const { data } = await supabase
    .from("chocolate_products")
    .select("*")
    .in("id", [49,50,51,52,53,54,55,57]);   // ✅ new IDs

  const grid = document.getElementById("productGrid50"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["chocolate_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="chocolate_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "chocolate_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts50(); 



async function loadProducts51(){

  const { data } = await supabase
    .from("chocolate_products")
    .select("*")
    .in("id", [56,58,59,60,61,62,63,64]);   // ✅ new IDs

  const grid = document.getElementById("productGrid51"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["chocolate_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="chocolate_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "chocolate_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts51(); 


async function loadProducts52(){

  const { data } = await supabase
    .from("chocolate_products")
    .select("*")
    .in("id", [65,66,67,68,69,70,71,72,73,74,75]);   // ✅ new IDs

  const grid = document.getElementById("productGrid52"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["chocolate_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="chocolate_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "chocolate_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts52(); 


async function loadProducts53(){

  const { data } = await supabase
    .from("chocolate_products")
    .select("*")
    .in("id", [76,77,78,79,80,81,82,83,84,85]);   // ✅ new IDs

  const grid = document.getElementById("productGrid53"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["chocolate_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="chocolate_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "chocolate_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts53(); 


async function loadProducts54(){

  const { data } = await supabase
    .from("chocolate_products")
    .select("*")
    .in("id", [86,87,88,89,90,91,92,93,94,95,96]);   // ✅ new IDs

  const grid = document.getElementById("productGrid54"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["chocolate_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="chocolate_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "chocolate_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts54(); 



async function loadProducts55(){

  const { data } = await supabase
    .from("chocolate_products")
    .select("*")
    .in("id", [97,98,99,101,102,103,104,105]);   // ✅ new IDs

  const grid = document.getElementById("productGrid55"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["chocolate_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="chocolate_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "chocolate_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts55(); 




async function loadProducts56(){

  const { data } = await supabase
    .from("skincare_products")
    .select("*")
    .in("id", [62,63,64,65,66,67]);   // ✅ new IDs

  const grid = document.getElementById("productGrid56"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["skincare_products_" + item.id] = item;
    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="skincare_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "skincare_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts56(); 


async function loadProducts32(){

  const { data } = await supabase
    .from("grocery_products")
    .select("*")
    .in("id", [80,81,82,83,84,85,86,87]);   // ✅ new IDs

  const grid = document.getElementById("productGrid32"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["grocery_products_" + item.id] = item;

    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="grocery_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;
const addBtn = card.querySelector(".addBtn2");



// 🔥 HALF AREA CONTROL (ONLY POPUP BLOCK)
const imgWrap = addBtn.parentElement;

imgWrap.addEventListener("click", function(e){

  const rect = this.getBoundingClientRect();
  const clickY = e.clientY - rect.top;

  const half = rect.height / 2;

  // ❌ TOP HALF → ONLY block popup (NOT everything)
  if(clickY < half){

    // IMPORTANT → DO NOT stop everything
    // only prevent card click (popup)
    if(e.target.closest(".addBtn2")){
      return; // allow + button
    }

    e.stopPropagation();  // ❌ stops popup only
  }

});
   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "grocery_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts32();





async function loadProducts57(){

  const { data } = await supabase
    .from("grocery_products")
    .select("*")
    .in("id", [88,89,90,91,92,93,94,95,96]);   // ✅ new IDs

  const grid = document.getElementById("productGrid57"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["grocery_products_" + item.id] = item;

    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="grocery_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;
const addBtn = card.querySelector(".addBtn2");



// 🔥 HALF AREA CONTROL (ONLY POPUP BLOCK)
const imgWrap = addBtn.parentElement;

imgWrap.addEventListener("click", function(e){

  const rect = this.getBoundingClientRect();
  const clickY = e.clientY - rect.top;

  const half = rect.height / 2;

  // ❌ TOP HALF → ONLY block popup (NOT everything)
  if(clickY < half){

    // IMPORTANT → DO NOT stop everything
    // only prevent card click (popup)
    if(e.target.closest(".addBtn2")){
      return; // allow + button
    }

    e.stopPropagation();  // ❌ stops popup only
  }

});
   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "grocery_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts57();





async function loadProducts58(){

  const { data } = await supabase
    .from("grocery_products")
    .select("*")
    .in("id", [97,98,99,100,101,102,103,104]);   // ✅ new IDs

  const grid = document.getElementById("productGrid58"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["grocery_products_" + item.id] = item;

    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="grocery_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;
const addBtn = card.querySelector(".addBtn2");



// 🔥 HALF AREA CONTROL (ONLY POPUP BLOCK)
const imgWrap = addBtn.parentElement;

imgWrap.addEventListener("click", function(e){

  const rect = this.getBoundingClientRect();
  const clickY = e.clientY - rect.top;

  const half = rect.height / 2;

  // ❌ TOP HALF → ONLY block popup (NOT everything)
  if(clickY < half){

    // IMPORTANT → DO NOT stop everything
    // only prevent card click (popup)
    if(e.target.closest(".addBtn2")){
      return; // allow + button
    }

    e.stopPropagation();  // ❌ stops popup only
  }

});
   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "grocery_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts58();




async function loadProducts59(){

  const { data } = await supabase
    .from("grocery_products")
    .select("*")
    .in("id", [105,106,107,108,109,110,111,112,113]);   // ✅ new IDs

  const grid = document.getElementById("productGrid59"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["grocery_products_" + item.id] = item;

    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="grocery_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;
const addBtn = card.querySelector(".addBtn2");



// 🔥 HALF AREA CONTROL (ONLY POPUP BLOCK)
const imgWrap = addBtn.parentElement;

imgWrap.addEventListener("click", function(e){

  const rect = this.getBoundingClientRect();
  const clickY = e.clientY - rect.top;

  const half = rect.height / 2;

  // ❌ TOP HALF → ONLY block popup (NOT everything)
  if(clickY < half){

    // IMPORTANT → DO NOT stop everything
    // only prevent card click (popup)
    if(e.target.closest(".addBtn2")){
      return; // allow + button
    }

    e.stopPropagation();  // ❌ stops popup only
  }

});
   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "grocery_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts59();






async function loadProducts60(){

  const { data } = await supabase
    .from("grocery_products")
    .select("*")
    .in("id", [114,115,116,117,118,119,120,121,122]);   // ✅ new IDs

  const grid = document.getElementById("productGrid60"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["grocery_products_" + item.id] = item;

    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="grocery_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;
const addBtn = card.querySelector(".addBtn2");



// 🔥 HALF AREA CONTROL (ONLY POPUP BLOCK)
const imgWrap = addBtn.parentElement;

imgWrap.addEventListener("click", function(e){

  const rect = this.getBoundingClientRect();
  const clickY = e.clientY - rect.top;

  const half = rect.height / 2;

  // ❌ TOP HALF → ONLY block popup (NOT everything)
  if(clickY < half){

    // IMPORTANT → DO NOT stop everything
    // only prevent card click (popup)
    if(e.target.closest(".addBtn2")){
      return; // allow + button
    }

    e.stopPropagation();  // ❌ stops popup only
  }

});
   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "grocery_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts60();





async function loadProducts61(){

  const { data } = await supabase
    .from("grocery_products")
    .select("*")
    .in("id", [123,124,125,126,127,128,129,130]);   // ✅ new IDs

  const grid = document.getElementById("productGrid61"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["grocery_products_" + item.id] = item;

    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="grocery_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;
const addBtn = card.querySelector(".addBtn2");



// 🔥 HALF AREA CONTROL (ONLY POPUP BLOCK)
const imgWrap = addBtn.parentElement;

imgWrap.addEventListener("click", function(e){

  const rect = this.getBoundingClientRect();
  const clickY = e.clientY - rect.top;

  const half = rect.height / 2;

  // ❌ TOP HALF → ONLY block popup (NOT everything)
  if(clickY < half){

    // IMPORTANT → DO NOT stop everything
    // only prevent card click (popup)
    if(e.target.closest(".addBtn2")){
      return; // allow + button
    }

    e.stopPropagation();  // ❌ stops popup only
  }

});
   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "grocery_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts61();



async function loadProducts62(){

  const { data } = await supabase
    .from("grocery_products")
    .select("*")
    .in("id", [131,132,133,134,135,136,137,138,139,140,151]);   // ✅ new IDs

  const grid = document.getElementById("productGrid62"); // ✅ new grid
  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["grocery_products_" + item.id] = item;

    const card = document.createElement("div");
    card.className = "productCard2";   // ✅ SAME UI

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="grocery_products">
  <div class="addBtn2">+</div>
</div>

        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;
const addBtn = card.querySelector(".addBtn2");



// 🔥 HALF AREA CONTROL (ONLY POPUP BLOCK)
const imgWrap = addBtn.parentElement;

imgWrap.addEventListener("click", function(e){

  const rect = this.getBoundingClientRect();
  const clickY = e.clientY - rect.top;

  const half = rect.height / 2;

  // ❌ TOP HALF → ONLY block popup (NOT everything)
  if(clickY < half){

    // IMPORTANT → DO NOT stop everything
    // only prevent card click (popup)
    if(e.target.closest(".addBtn2")){
      return; // allow + button
    }

    e.stopPropagation();  // ❌ stops popup only
  }

});
   card.addEventListener("click", function(e){

      // ❌ block + button
      if(e.target.closest(".cartControl")){
        return;
      }

      const img = card.querySelector(".imgWrap2");
      const rect = img.getBoundingClientRect();

      const clickY = e.clientY - rect.top;
      const half = rect.height / 2;

      // 🔴 top half of image → no popup
      if(clickY < half){
        return;
      }

  openPopup({
  ...item,
  table: item.table || "grocery_products"
});
});

    grid.appendChild(card);
  });
  initAllUI();
}

loadProducts62();

// Mapping of categories to Supabase tables and product IDs
const categoryConfig = {
  cool_drinks: {
    table: "cool_drinks_products",
    ids: [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,4,2],
    title: "2 Litre Cool Drinks"
  },
  instant: {
    table: "cool_drinks_products",
    ids: [11,12,13,14,15,16,31,32,33,34,35,36,37,38,39,8],
    title: "Instant"
  },
  juices: {
    table: "cool_drinks_products",
    ids: [18,19,17,20,21,22,23,2,3,4,5,6,8,9,35,31],
    title: "Juices"
  },
  boost_energy: {
    table: "cool_drinks_products",
    ids: [24,25,26,27,28,29,30,10,11,12,13,14,15,20,21],
    title: "Boost Energy"
  },
  under_20 : {
    table: "cool_drinks_products",
    ids: [2,18,19,20,21,22,23,24,25,26,62,63,64,65,70,71],
    title: "Under 20"
  },
  Water_Bottles: {
    table: "cool_drinks_products",
    ids: [63,64,65,66,67,68,69,70,8,9,10,11,12,19,22],
    title: "Water_Bottles"
  },
  Dairy: {
    table: "cool_drinks_products",
    ids: [24,25,26,27,28,29,30,10,11,12,13,14,15,20,21],
    title: "Dairy"
  },
  one_Litre: {
    table: "cool_drinks_products",
    ids: [7,27,28,29,30,31,32,33,34,35,36,37,58,43,44],
    title: "One Litre"
  }
};
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("categoryPopup");
  const titleElement = document.getElementById("categoryTitle");
  const grid = document.getElementById("categoryGrid");
  const closeBtn = document.getElementById("closePopupBtn");

  // Add click listeners to all midItem elements
  document.querySelectorAll(".midItem").forEach(item => {
    item.addEventListener("click", () => {
      const categoryKey = item.dataset.category;
      const config = categoryConfig[categoryKey];

      if (!config) {
        console.error(`No configuration found for category: ${categoryKey}`);
        return;
      }

      // Set popup title
      titleElement.textContent = config.title;

      // Show popup
       lockBodyScroll();

      popup.classList.add("show");

      // Load products from Supabase
      loadCategoryProducts(config.table, config.ids);
    });
  });

  // Close popup
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("show");
    unlockBodyScroll();
  });
});
async function loadCategoryProducts(tableName, ids) {
  const grid = document.getElementById("categoryGrid");
 grid.innerHTML = `
  <div style="
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    width: 100%;
    text-align: center;
  ">
    <p style="margin: 0; font-size: 16px; color: #555;">Loading...</p>
  </div>
`;
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .in("id", ids);

  if (error) {
    console.error(`Error loading ${tableName}:`, error);
    grid.innerHTML = "<p style='padding:20px; text-align:center;'>Failed to load products.</p>";
    return;
  }

  grid.innerHTML = "";

  data.forEach(item => {

  // ✅ ADD THIS LINE HERE
  window.productMap = window.productMap || {};
  window.productMap["all_products_" + item.id] = item;    const card = document.createElement("div");
    card.className = "productCard2";

    card.innerHTML = `
      <div class="imgWrap2">
        <img src="${item.image1}" alt="${item.name}">
       <div class="cartControl" 
     data-id="${item.id}" 
     data-table="${tableName}">
  <div class="addBtn2">+</div>
</div>
        <div class="qtyInside">
          ${item.quantity} ${item.unit}
        </div>
      </div>

      <div class="pName2">${item.name}</div>
      <div class="brand2">${item.brand || ""}</div>

      <div class="priceRow2">
        <div class="pPrice2">
          ₹${item.discount_price}
          <span>₹${item.original_price}</span>
        </div>

        <div class="ratingGreen">
          <i class="fa-solid fa-star"></i>
          ${item.rating || "0"}
        </div>
      </div>
    `;

    // Open your existing product details popup
    card.addEventListener("click", (e) => {

  if(e.target.closest(".cartControl")){
    return;
  }

  openPopup({
    ...item,
    table: tableName   // ✅ CRITICAL FIX
  });

});
    grid.appendChild(card);
  });
  initAllUI();
}

let scrollPosition = 0;

function lockBodyScroll(){
  scrollPosition = window.scrollY;

  document.documentElement.classList.add("popup-open");
  document.body.classList.add("popup-open");

  document.body.style.top = `-${scrollPosition}px`;
}

function unlockBodyScroll(){

  document.documentElement.classList.remove("popup-open");
  document.body.classList.remove("popup-open");

  document.body.style.top="";

  setTimeout(()=>{
    window.scrollTo(0, scrollPosition); // simpler
  },50);

}
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("cartBar").addEventListener("click", toggleMiniCart);



  function getCart(){
    return JSON.parse(localStorage.getItem("cart") || "{}");
  }

  function setCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateBoxes(id, table, count){
    document.querySelectorAll(`.cartControl[data-id="${id}"][data-table="${table}"]`)
      .forEach(box => {

        if(count > 0){
          box.classList.add("active");
          box.innerHTML = `
            <div class="minus">-</div>
            <div class="count">${count}</div>
            <div class="plus">+</div>
          `;
        } else {
          box.classList.remove("active");
          box.innerHTML = `<div class="addBtn2">+</div>`;
        }

      });
  }

  function updatePopupBox(id, table, count){
    document.querySelectorAll(`.popupCartControl[data-id="${id}"][data-table="${table}"]`)
      .forEach(box => {

        if(count > 0){
          box.classList.add("active");

          box.innerHTML = `
            <div class="minus">-</div>
            <div class="count">${count}</div>
            <div class="plus">+</div>
          `;
        } else {
          box.classList.remove("active");
          box.innerHTML = `<button class="addBigBtn">ADD</button>`;
        }

      });
  }

  window.initAllUI = function(){
    const cart = getCart();

    document.querySelectorAll(".cartControl").forEach(box => {
      const id = box.dataset.id;
      const table = box.dataset.table;
      const key = table + "_" + id;

      const count = cart[key] || 0;
      updateBoxes(id, table, count);
    });

    document.querySelectorAll(".popupCartControl").forEach(box => {
      const id = box.dataset.id;
      const table = box.dataset.table;
      const key = table + "_" + id;

      const count = cart[key] || 0;
      updatePopupBox(id, table, count);
    });
  }

  document.body.addEventListener("click", function(e){
    // 🔥 CHECK IF CART EMPTY
const updatedCart = JSON.parse(localStorage.getItem("cart") || "{}");

if(Object.keys(updatedCart).length === 0){

  // hide popup
  const cartPopup = document.getElementById("cartPopup");
  cartPopup.classList.remove("show");

  document.body.classList.remove("popup-open");

  // also hide mini cart
  const mini = document.getElementById("miniCart");
  mini.classList.remove("show");
}

    const btn = e.target.closest(".addBtn2, .plus, .minus, .addBigBtn");
    if(!btn) return;

    const box = btn.closest(".cartControl") || btn.closest(".popupCartControl");
    if(!box) return;

    const id = box.dataset.id;
    const table = box.dataset.table;
    const key = table + "_" + id;

    let cart = getCart();   // ✅ FIXED
    let count = cart[key] || 0;   // ✅ FIXED

    if(
      btn.classList.contains("addBtn2") ||
      btn.classList.contains("plus") ||
      btn.classList.contains("addBigBtn")
    ){
      count++;
    } 
    else if(btn.classList.contains("minus")){
      count--;
    }

    if(count <= 0){
      delete cart[key];   // ✅ FIXED
      count = 0;
    } else {
      cart[key] = count;  // ✅ FIXED
    }

    setCart(cart);
    // 🔥 ADD HERE (exact place)
discount = 0;

const msg = document.getElementById("couponMsg");
const billRow = document.getElementById("billCouponRow");
const input = document.getElementById("promoInput");

if(msg) msg.innerText = "";
if(billRow) billRow.style.display = "none";
if(input) input.value = "";

    updateCartBar();

    updateBoxes(id, table, count);        // ✅ FIXED
    updatePopupBox(id, table, count);  
    // 🔥 refresh popup list if open
const cartPopup = document.getElementById("cartPopup");
if(cartPopup.classList.contains("show")){
  renderCartItems();
} 
      // 🔥 ADD HERE (THIS EXACT PLACE)
const mini = document.getElementById("miniCart");

if(mini.classList.contains("show")){
  renderMiniCart();
}
  });

});
function updateCartBar(){
const skel=
document.getElementById(
"cartLoadingSkeleton"
);

if(skel){
skel.style.display="none";
}
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  const keys = Object.keys(cart);

  const bar = document.getElementById("cartBar");
  const imgBox = document.getElementById("cartImages");
  const mini = document.getElementById("miniCart");

  imgBox.innerHTML = "";

  if(keys.length === 0){
    document.getElementById(
"placeOrderBtn"
)?.classList.add("disabled");
    bar.classList.add("hidden");
    mini.classList.remove("show");
    mini.innerHTML = "";
    return;
  }

  // 🔥 WAIT UNTIL productMap READY (MAIN FIX)
  if(!window.productMap || Object.keys(window.productMap).length === 0){
    setTimeout(updateCartBar, 100);   // retry after 100ms
    return;
  }

  bar.classList.remove("hidden");
  document.getElementById(
"placeOrderBtn"
)?.classList.remove("disabled");

 calculateTotal(keys, cart);   // 🔥 NEW
loadCartImages(keys);         // 🔥 OUTSIDE LOOP

  const lastKeys = keys.slice(-3);

 function loadCartImages(keys, attempt = 0){

  imgBox.innerHTML = "";

  let loaded = 0;

  keys.slice(-3).forEach(key => {

    const item = getProduct(key);

    if(item && item.image1){
      const img = document.createElement("img");
      img.src = item.image1;
      img.onerror = () => img.remove();
      imgBox.appendChild(img);
      loaded++;
    }

  });

  // 🔥 retry if not all images loaded
  if(loaded < Math.min(3, keys.length) && attempt < 5){
    setTimeout(() => loadCartImages(keys, attempt + 1), 100);
  }
}

// 🔥 call it
loadCartImages(keys);

  if(keys.length > 3){
    const more = document.createElement("div");
    more.className = "more";
    more.textContent = "+" + (keys.length - 3);
    imgBox.appendChild(more);
  }
}
function toggleMiniCart(){

  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  const keys = Object.keys(cart);

  const box = document.getElementById("miniCart");

 if(keys.length === 0){
  box.classList.remove("show");
  box.innerHTML = "";   // 🔥 IMPORTANT (clear old items)
  return;
}

  // toggle
  if(box.classList.contains("show")){
    box.classList.remove("show");
    return;
  }

  box.innerHTML = "";

  keys.forEach(key => {

    const item = getProduct(key);
if(!item) return;

    // ✅ SPLIT KEY
    const parts = key.split("_");
const id = parts.pop();                 // last part = id
const table = parts.join("_");          // rest = table

    const div = document.createElement("div");
    div.className = "miniRow";

    div.innerHTML = `
      <img src="${item.image1}" class="miniImg">

      <div class="miniInfo">
        <div>${item.name}</div>
        <div>₹${item.discount_price}</div>
      </div>

      <!-- ✅ FIXED TABLE + ID -->
      <div class="cartControl"
        data-id="${id}"
        data-table="${table}">
      </div>
    `;

    box.appendChild(div);
  });

  box.classList.add("show");

  initAllUI(); // 🔥 important for + -
}

function calculateTotal(keys, cart, attempt = 0){

  let totalItems = 0;
  let totalPrice = 0;
  let ready = true;

  keys.forEach(k => {

    const item = getProduct(k);
    const qty = cart[k] || 0;

    totalItems += qty;

    if(!item){
      ready = false;
      return;
    }

    totalPrice += item.discount_price * qty;

  });

  // retry if products not ready
  if(!ready && attempt < 5){
    setTimeout(() => calculateTotal(keys, cart, attempt + 1), 100);
    return;
  }

  document.getElementById("cartCount").textContent =
    totalItems === 1 ? "1 item" : totalItems + " items";

  document.getElementById("cartTotal").textContent =
    "₹" + totalPrice;
}
function getProduct(key){

  // ✅ ONLY exact match
  if(window.productMap && window.productMap[key]){
    return window.productMap[key];
  }

  return null; // ❌ no fallback
}
function renderMiniCart(){

  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  const keys = Object.keys(cart);

  const box = document.getElementById("miniCart");

  box.innerHTML = "";

  // 🔥 auto hide if empty
  if(keys.length === 0){
    box.classList.remove("show");
    return;
  }

  keys.forEach(key => {

   const item = getProduct(key);
if(!item) return;

    const parts = key.split("_");
const id = parts.pop();                 // last part = id
const table = parts.join("_");          // rest = table
    const count = cart[key];   // 🔥 get correct quantity

    const div = document.createElement("div");
    div.className = "miniRow";

    div.innerHTML = `
      <img src="${item.image1}" class="miniImg">

      <div class="miniInfo">
        <div>${item.name}</div>
        <div>₹${item.discount_price}</div>
      </div>

      <!-- 🔥 FORCE SHOW QUANTITY -->
      <div class="cartControl active"
        data-id="${id}"
        data-table="${table}">

        <div class="minus">-</div>
        <div class="count">${count}</div>
        <div class="plus">+</div>

      </div>
    `;

    box.appendChild(div);
  });

  initAllUI(); // keep sync
}
function waitAndLoadCart(){

  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  const keys = Object.keys(cart);

  const bar = document.getElementById("cartBar");

  // 🔥 STEP 1: INSTANT PRELOAD (no productMap needed)
  if(keys.length > 0){

    bar.classList.remove("hidden");

    let totalItems = 0;

    keys.forEach(k => {
      totalItems += cart[k];
    });

    // 🔥 show instantly
    document.getElementById("cartCount").innerText =
      totalItems === 1 ? "1 item" : totalItems + " items";

    document.getElementById("cartTotal").innerText = "Loading...";
  }

  // 🔥 STEP 2: WAIT FOR productMap (your original logic)
  if(window.productMap && Object.keys(window.productMap).length > 0){

    console.log("✅ productMap ready → loading full cart");

    const skel = document.getElementById("cartLoadingSkeleton");
    if(skel){
      skel.style.display = "none";
    }

    updateCartBar();   // 🔥 full update with price + images
    initAllUI();

  } else {

    console.log("⏳ still waiting for productMap...");
    setTimeout(waitAndLoadCart, 150);
  }
}

waitAndLoadCart();
const viewBtn = document.getElementById("viewCartBtn");
const cartPopup = document.getElementById("cartPopup");

viewBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  cartPopup.classList.add("show");
  document.body.classList.add("popup-open");

  document.getElementById("cartCity").innerText =
    document.getElementById("cityName").innerText;

  document.getElementById("cartAddress").innerText =
    document.getElementById("shortAddress").innerText;

  // 🔥 LOAD BOTH
  loadCartRecommendations();   // 👈 NEW
  setTimeout(() => {
    renderCartItems();
  }, 100);
});
document.querySelector(".backBtn").onclick = () => {
  cartPopup.classList.remove("show");
  document.body.classList.remove("popup-open");
};
let itemsTotal = 0;
let total = 0;
function renderCartItems(attempt = 0) {

  const cart = JSON.parse(localStorage.getItem("cart") || "{}");

  const keys = Object.keys(cart);

  const list = document.getElementById("cartItemsList");
  const title = document.getElementById("cartTitle"); // 🔥 get title
  const countEl = document.getElementById("cartItemCount");

  list.innerHTML = "";
// 🔥 ADD COUNT LOGIC HERE (BEFORE empty check)
  let totalItems = 0;
  keys.forEach(k => {
    totalItems += cart[k];
  });

  countEl.textContent = totalItems > 0
    ? `(${totalItems} ${totalItems === 1 ? "item" : "items"})`
    : "";

  // 🔴 EMPTY CART
  if(keys.length === 0){
  // ✅ RESET BILL VALUES WHEN CART EMPTY
itemsTotal = 0;
total = 0;
discount = 0;

// reset bill UI
const billItems = document.getElementById("billItemsTotal");
const billHandling = document.getElementById("billHandling");
const billDelivery = document.getElementById("billDelivery");
const billTotal = document.getElementById("billTotal");
const checkoutPrice = document.getElementById("checkoutPrice");

if(billItems) billItems.innerText = "₹0";
if(billHandling) billHandling.innerText = "₹0";
if(billDelivery) billDelivery.innerText = "₹0";
if(billTotal) billTotal.innerText = "₹0";
if(checkoutPrice) checkoutPrice.innerText = "₹0";

// hide gift row
const giftRow = document.getElementById("billGiftRow");
if(giftRow) giftRow.style.display = "none";

// reset gift button
const giftBtn = document.getElementById("giftBtn");
if(giftBtn) giftBtn.innerText = "ADD";

giftAdded = false;

    title.style.display = "none"; // 🔥 HIDE "Your Items"

    list.innerHTML = `
      <div style="text-align:center; padding:30px 15px;">

        <p style="font-size:14px; color:#666; margin-bottom:12px;">
          Your cart is empty
        </p>

        <button id="shopNowBtn" style="
          background:#0f5c5c;
          color:#fff;
          border:none;
          padding:10px 18px;
          border-radius:10px;
          font-size:14px;
          font-weight:600;
        ">
          Shop Now
        </button>

      </div>
    `;

    document.getElementById("shopNowBtn").onclick = () => {
      document.getElementById("cartPopup").classList.remove("show");
      document.body.classList.remove("popup-open");
    };

    return;
  }

  // 🟢 HAS ITEMS
  title.style.display = "block"; // 🔥 SHOW "Your Items" again

  // 🔥 WAIT for productMap
  if(!window.productMap || Object.keys(window.productMap).length === 0){
    if(attempt < 5){
      setTimeout(() => renderCartItems(attempt + 1), 100);
    }
    return;
  }

  keys.forEach(key => {

    const item = getProduct(key);
    if(!item) return;

    const qty = cart[key];

    const parts = key.split("_");
    const id = parts.pop();
    const table = parts.join("_");

    list.innerHTML += `
      <div class="cartItemRow">
        <img src="${item.image1}">
        
        <div class="cartItemInfo">

  <!-- PRICE -->
  <div class="cartItemTop">
    ₹${item.discount_price * qty}
  </div>

  <!-- NAME -->
  <div class="cartItemName">${item.name}</div>

  <!-- 🔥 SMART QUANTITY -->
 <div class="cartItemQty">
  Qty: ${formatQuantity(item, qty)}
</div>

</div>

        <div class="cartControl active"
          data-id="${id}"
          data-table="${table}">
          <div class="minus">-</div>
          <div class="count">${qty}</div>
          <div class="plus">+</div>
        </div>
      </div>
    `;
  });
// 🔥 BILL CALCULATION
itemsTotal = 0;

keys.forEach(key => {
  const item = getProduct(key);
  if(!item) return;

  const qty = cart[key];
  itemsTotal += item.discount_price * qty;
});

// 🔥 handling fee logic
let handlingFee = 0;

if(totalItems > 10){
  handlingFee = Math.floor((totalItems - 1) / 10) * 10;
}

let deliveryFee = 20;

total = itemsTotal + handlingFee + deliveryFee;

if(giftAdded){
  total += GIFT_PRICE;
}

// 🔥 SAFE UPDATE (no crash)
const billItems = document.getElementById("billItemsTotal");
const billHandling = document.getElementById("billHandling");
const billDelivery = document.getElementById("billDelivery");
const billTotal = document.getElementById("billTotal");

if(billItems) billItems.innerText = `₹${itemsTotal}`;

if(billHandling){
  if(handlingFee === 0){
    billHandling.innerHTML = `<span style="text-decoration:line-through;color:#999;">₹10</span>`;
  }else{
    billHandling.innerText = `₹${handlingFee}`;
  }
}

if(billDelivery) billDelivery.innerText = `₹${deliveryFee}`;
if(billTotal) billTotal.innerText = `₹${total}`;
const checkoutPrice = document.getElementById("checkoutPrice");
if(checkoutPrice){
  checkoutPrice.innerText = `₹${total - discount}`;
}

initAllUI();
}
async function loadCartRecommendations(){

const [
groceryRes,
skinRes,
coolRes
] = await Promise.all([

supabase
.from("grocery_products")
.select("*")
.in("id",[14,14,20,6,4]),

supabase
.from("skincare_products")
.select("*")
.in("id",[4,6,8,11,15]),

supabase
.from("cool_drinks_products")
.select("*")
.in("id",[21,45,55,13,26])

]);


/* merge all */
const data=[
...(groceryRes.data||[]).map(x=>({
...x,
table:"grocery_products"
})),

...(skinRes.data||[]).map(x=>({
...x,
table:"skincare_products"
})),

...(coolRes.data||[]).map(x=>({
...x,
table:"cooldrinks_products"
}))
];


const grid=document.getElementById("cartRecoGrid");
grid.innerHTML="";


if(!data.length){
grid.innerHTML=
"<p style='padding:10px'>No offers</p>";
return;
}


data.forEach(item=>{

/* sync with cart system */
window.productMap=
window.productMap||{};

window.productMap[
item.table+"_"+item.id
]=item;


const card=document.createElement("div");
card.className="productCard2";


card.innerHTML=`
<div class="imgWrap2">
<img src="${item.image1}">

<div class="cartControl"
data-id="${item.id}"
data-table="${item.table}">
<div class="addBtn2">+</div>
</div>

<div class="qtyInside">
${item.quantity} ${item.unit}
</div>
</div>

<div class="pName2">${item.name}</div>

<div class="brand2">
${item.brand||""}
</div>

<div class="priceRow2">
<div class="pPrice2">
₹${item.discount_price}
<span>₹${item.original_price}</span>
</div>

<div class="ratingGreen">
<i class="fa-solid fa-star"></i>
${item.rating||"0"}
</div>
</div>
`;


/* same click logic */
card.addEventListener("click",function(e){

if(e.target.closest(".cartControl")){
return;
}

openPopup({
...item,
table:item.table
});

});


grid.appendChild(card);

});


initAllUI();

}

function formatQuantity(item, qty){

  let baseQty = parseFloat(item.quantity); // e.g. 500
  let unit = item.unit.toLowerCase();      // g, kg, ml, l, pcs

  let total = baseQty * qty;

  // 🔥 grams → kg
  if(unit === "g" && total >= 1000){
    return (total / 1000) + " kg";
  }

  // 🔥 ml → litre
  if(unit === "ml" && total >= 1000){
    return (total / 1000) + " L";
  }

  // 🔥 normal cases
  return total + " " + item.unit;
}
// 🔥 ADD HERE (very bottom of file)

let discount = 0;

document.addEventListener("click", function(e){

  if(e.target.id === "applyPromoBtn"){

    const code = document.getElementById("promoInput").value.trim();
    const msg = document.getElementById("couponMsg");

    const billRow = document.getElementById("billCouponRow");
    const billText = document.getElementById("billCouponText");
    const billDiscount = document.getElementById("billDiscount");

    if(code === "FIRST100"){
  // OK — continue
}

else if(code.toUpperCase() === "FIRST100"){
  msg.innerText = "Please enter coupon in CAPITAL letters";
  if(billRow) billRow.style.display = "none";
  return;
}

else{
  msg.innerText = "Invalid coupon";
  if(billRow) billRow.style.display = "none";
  return;
}

    if(itemsTotal < 100){
      msg.innerText = "Shop above ₹100 to apply this coupon";
      if(billRow) billRow.style.display = "none";
      return;
    }

    // 🔥 discount logic
    discount = Math.floor(itemsTotal / 100) * 10;

    if(discount > 50) discount = 50;

    msg.innerText = "Coupon Applied ✅";
    playCouponBlast();

    // 🔥 SHOW in bill
    if(billRow) billRow.style.display = "flex";
    if(billText) billText.innerText = "Coupon (FIRST100)";
    if(billDiscount) billDiscount.innerText = `-₹${discount}`;

    // 🔥 update total
    const newTotal = total - discount;

    const billTotal = document.getElementById("billTotal");
    if(billTotal){
      billTotal.innerText = `₹${newTotal}`;
    }
    // 🔥 ALSO UPDATE STICKY BAR
const checkoutPrice = document.getElementById("checkoutPrice");
if(checkoutPrice){
  checkoutPrice.innerText = `₹${newTotal}`;
}
  }

});
let giftAdded = false;
const GIFT_PRICE = 12;
document.getElementById("giftBtn").addEventListener("click", function(){

  const btn = this;

  const giftRow = document.getElementById("billGiftRow");

  if(!giftAdded){

    // ADD gift
    giftAdded = true;

    btn.innerText = "REMOVE";

    if(giftRow){
      giftRow.style.display = "flex";
    }

  } else {

    // REMOVE gift
    giftAdded = false;

    btn.innerText = "ADD";

    if(giftRow){
      giftRow.style.display = "none";
    }

  }

  // recalculate bill
  renderCartItems();

});
function playCouponBlast(){

  const container = document.getElementById("couponBlast");
  if(!container) return;

  container.style.display = "block";

  const emojis = ["🎉","🎊","✨","💥","🎈","🎀"];

  let interval = setInterval(() => {

    for(let i = 0; i < 14; i++){

      const particle = document.createElement("div");
      particle.className = "blastParticle";

      particle.innerText =
        emojis[Math.floor(Math.random() * emojis.length)];

      const fromLeft = Math.random() > 0.5;

      particle.style.top =
        Math.random() * container.clientHeight + "px";

      if(fromLeft){
        particle.style.left = "0px";
      } else {
        particle.style.right = "0px";
      }

      const x =
        (Math.random() * 350 + 150) *
        (fromLeft ? 1 : -1);

      const y =
        (Math.random() * 200 - 100);

      particle.style.setProperty("--x", x + "px");
      particle.style.setProperty("--y", y + "px");

      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1000);

    }

  }, 120);

  // STOP after 3 seconds
  setTimeout(() => {
    clearInterval(interval);
    container.style.display = "none";
  }, 3000);

}
document.getElementById("profileLink").addEventListener("click", function(e){

 e.preventDefault();

 if(
   localStorage.getItem("userName") &&
   localStorage.getItem("userMobile")
 ){
    window.location.href="order.html";
 }
 else{
    localStorage.setItem(
"redirectAfterLogin",
window.location.href
);

localStorage.setItem(
"openOrderPopupAfterLogin",
"yes"
);

window.location.href="login.html";
 }

});
document.getElementById(
"placeOrderBtn"
).onclick=function(){

  if(total<=0){
return;
}

let userName=
localStorage.getItem(
"userName"
);

let userMobile=
localStorage.getItem(
"userMobile"
);


/* if not logged in */
if(!userName || !userMobile){

window.location.href=
"login.html";

return;

}


/* logged in continue normal flow */

document.getElementById(
"selfOrder"
).style.display="block";

document.getElementById(
"otherOrder"
).style.display="none";


document.getElementById(
"finalPay"
).innerText=
document.getElementById(
"billTotal"
).innerText;


document.getElementById(
"orderPopup"
).classList.add("show");


document.body.classList.add(
"popup-open"
);


relocateUser();

}



function closeOrderPopup(){

document.getElementById("orderPopup")
.classList.remove("show");

document.body.classList.remove("popup-open");


// reset after close animation
setTimeout(function(){

document.getElementById("selfOrder").style.display="block";

document.getElementById("otherOrder").style.display="none";

},300);

}



let recipientMap;
let marker;

function showOtherOrder(){

document.getElementById("selfOrder").style.display="none";
document.getElementById("otherOrder").style.display="block";


navigator.geolocation.getCurrentPosition(function(pos){

let lat=pos.coords.latitude;
let lng=pos.coords.longitude;

setTimeout(function(){

if(recipientMap){
recipientMap.remove();
}

recipientMap=L.map('mapBox2')
.setView([lat,lng],16);


L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(recipientMap);



marker=L.marker(
[lat,lng],
{draggable:true}
).addTo(recipientMap);



showAddress(lat,lng);


/* when user drags pin */
marker.on('dragend',function(){

let p=marker.getLatLng();

showAddress(p.lat,p.lng);

});

},300);

});

}
function showAddress(lat,lng){

fetch(
"https://nominatim.openstreetmap.org/reverse?format=json&lat="
+lat+
"&lon="
+lng
)

.then(res=>res.json())

.then(data=>{

document.getElementById(
"pickedAddress"
).innerHTML=
"<b>Your Address:</b><br>" +
data.display_name;

})

.catch(function(){

document.getElementById(
"pickedAddress"
).innerHTML=
"Address not found";

});

}
function relocateUser(){

navigator.geolocation.getCurrentPosition(function(pos){

let lat=pos.coords.latitude;
let lng=pos.coords.longitude;

document.getElementById("userMap").src=
"https://www.google.com/maps?q="
+lat+","+lng+
"&z=16&output=embed";


fetch(
"https://nominatim.openstreetmap.org/reverse?format=json&lat="
+lat+"&lon="+lng
)
.then(r=>r.json())
.then(data=>{
document.getElementById("userAddress").innerHTML=
"<b>Your Address:</b><br>"+
data.display_name;
});

});

}
function backToSelfOrder(){

document.getElementById("otherOrder").style.display="none";

document.getElementById("selfOrder").style.display="block";

}

/* auto load once popup opens */
relocateUser();

function confirmSelf(){

let name=
document.getElementById("custName");

let mobile=
document.getElementById("custMobile");

let city=
document.getElementById("custCity");

let address=
document.getElementById("custAddress");

let valid=true;


/* Name check */
if(name.value.trim()==""){
shakeField(name);
valid=false;
}


/* Mobile exactly 10 digits */
if(!/^[0-9]{10}$/.test(mobile.value)){
shakeField(mobile);
valid=false;
}


/* City */
if(city.value.trim()==""){
shakeField(city);
valid=false;
}


/* Address */
if(address.value.trim()==""){
shakeField(address);
valid=false;
}


if(!valid){
return;
}


/* passed validation */
openPaymentPopup();

}
function confirmRecipient(){

let name=
document.getElementById("recName");

let mobile=
document.getElementById("recMobile");

let city=
document.getElementById("recCity");

let address=
document.getElementById("recAddress");

let valid=true;


if(name.value.trim()==""){
shakeField(name);
valid=false;
}


if(!/^[0-9]{10}$/.test(mobile.value)){
shakeField(mobile);
valid=false;
}


if(city.value.trim()==""){
shakeField(city);
valid=false;
}


if(address.value.trim()==""){
shakeField(address);
valid=false;
}


if(!valid){
return;
}


/* only if all entered */
openPaymentPopup();

}

function openPaymentPopup(){

document.getElementById("paymentTotal").innerText=
document.getElementById("billTotal").innerText;

document.getElementById("paymentPopup")
.classList.add("show");

}


function closePaymentPopup(){

document.getElementById("paymentPopup")
.classList.remove("show");

}



function hidePaymentFields(){

document.getElementById(
"cardFields"
).style.display="none";

}



function selectPayment(){

hidePaymentFields();

let btn=
document.getElementById(
"finalPlaceBtn"
);

btn.disabled=false;

btn.classList.add("active");

}



function showCardFields(){

hidePaymentFields();

document.getElementById(
"cardFields"
).style.display="block";


let btn=
document.getElementById(
"finalPlaceBtn"
);

btn.disabled=false;

btn.classList.add("active");

}

async function placeFinalOrder(){


let customerName=
localStorage.getItem(
"userName"
) || "";


let customerMobile=
localStorage.getItem(
"userMobile"
) || "";



let isRecipient=
document.getElementById(
"otherOrder"
).style.display=="block";



let recipientName="";
let recipientMobile="";


if(isRecipient){

recipientName=
document.getElementById(
"recName"
).value;


recipientMobile=
document.getElementById(
"recMobile"
).value;

}



/* cart object from localStorage */
let rawCart=
JSON.parse(
localStorage.getItem("cart")
) || {};



/* convert keys into order items */
let cartItems=[];


Object.entries(rawCart)
.forEach(function(entry){

let key=entry[0];

let qty=entry[1];


/* all_products_7 -> table + id */
let parts=
key.split("_");


let productId=
parts.pop();


let tableName=
parts.join("_");



cartItems.push({

product_id:
productId,


table_name:
tableName,


qty:
qty,


gift:false,


gift_note:""

});

});



let payMethod=
document.querySelector(
'input[name="pay"]:checked'
)?.parentElement.innerText
|| "Cash On Delivery";



let finalTotal=
parseFloat(
document.getElementById(
"billTotal"
).innerText.replace(/[^\d.]/g,'')
);



let deliveryFee=0;



let mapAddress=
isRecipient
? document.getElementById(
"pickedAddress"
).innerText
: document.getElementById(
"userAddress"
).innerText;



const {error}=await supabase
.from("orders")
.insert([{

customer_name:
customerName,


customer_mobile:
customerMobile,
self_form_name:
isRecipient
? null
: document.getElementById(
"custName"
).value,


self_form_mobile:
isRecipient
? null
: document.getElementById(
"custMobile"
).value,

order_type:
isRecipient
? "recipient"
: "self",


recipient_name:
recipientName,


recipient_mobile:
recipientMobile,


village_city:
isRecipient
? document.getElementById(
"recCity"
).value
: document.getElementById(
"custCity"
).value,


typed_address:
isRecipient
? document.getElementById(
"recAddress"
).value
: document.getElementById(
"custAddress"
).value,


map_address:
mapAddress,


payment_method:
payMethod,


delivery_fee:
deliveryFee,


total_amount:
finalTotal,


cart_items:
cartItems

}]);


if(!error){

showSuccessPopup();

}else{

console.log(error);

alert(
"Order failed"
);

}

}


// above plave
function shakeField(el){

el.classList.add("shake");

setTimeout(function(){
el.classList.remove("shake");
},400);

}
function hidePaymentFields(){

document.getElementById(
"cardFields"
).style.display="none";

}



function selectPayment(){

/* hide extra fields when other methods chosen */
hidePaymentFields();


let btn=
document.getElementById(
"finalPlaceBtn"
);

btn.disabled=false;

btn.classList.add("active");

}



/* only for card option */
function showCardFields(){

hidePaymentFields();

document.getElementById(
"cardFields"
).style.display="block";


let btn=
document.getElementById(
"finalPlaceBtn"
);

btn.disabled=false;

btn.classList.add("active");

}
function showBankFields(){

hidePaymentFields();

document.getElementById(
"bankFields"
).style.display="block";

let btn=
document.getElementById(
"finalPlaceBtn"
);

btn.disabled=false;

btn.classList.add("active");

}



function hidePaymentFields(){

document.getElementById(
"cardFields"
).style.display="none";


if(document.getElementById("bankFields")){
document.getElementById(
"bankFields"
).style.display="none";
}

}
function showSuccessPopup(){

const payment=document.getElementById("paymentPopup");
const s=document.getElementById("successPopup");

/* preserve user data */
const savedName=
localStorage.getItem("custName");

const savedMobile=
localStorage.getItem("custMobile");

const savedUsername=
localStorage.getItem("username");

const savedPassword=
localStorage.getItem("password");


payment.scrollTop=0;
payment.style.overflow="hidden";

document.body.classList.add("success-lock");


/* show success instantly */
s.classList.add("show");


/* 🔥 instant cart/data reset NOW (not after 4 sec) */

localStorage.removeItem("cart");
localStorage.removeItem("cartItems");
localStorage.removeItem("coupon");
localStorage.removeItem("giftWrap");
localStorage.removeItem("custAddress");
localStorage.removeItem("custCity");
localStorage.removeItem("orderData");


/* restore protected data */
if(savedName)
localStorage.setItem("custName",savedName);

if(savedMobile)
localStorage.setItem("custMobile",savedMobile);

if(savedUsername)
localStorage.setItem("username",savedUsername);

if(savedPassword)
localStorage.setItem("password",savedPassword);


/* empty cart */
cart=[];


/* hide bars immediately */
document.querySelector(".cartBar")
?.classList.add("hidden");

document.querySelector(".miniCart")
?.classList.remove("show");


/* reset totals instantly */
if(document.getElementById("cartCount")){
document.getElementById("cartCount").textContent="0 Items";
}

if(document.getElementById("cartTotal")){
document.getElementById("cartTotal").textContent="₹0";
}

if(document.getElementById("cartItemsList")){
document.getElementById("cartItemsList").innerHTML="";
}


/* reset all + - controls to ADD */
document.querySelectorAll(
".cartControl,.popupCartControl"
).forEach(el=>{
el.classList.remove("active");
el.innerHTML=
'<div class="addBtn2">+</div>';
});


document.querySelectorAll(".qtyInside")
.forEach(el=>el.remove());


if(typeof updateCartUI==="function"){
updateCartUI();
}

if(typeof renderProducts==="function"){
renderProducts();
}



/* after animation ends just close popups */
setTimeout(()=>{

s.classList.remove("show");

document.body.classList.remove("success-lock");

payment.style.overflow="auto";


closePaymentPopup();
closeOrderPopup();

if(document.getElementById("cartPopup")){
document.getElementById("cartPopup")
.classList.remove("show");
}


document.getElementById("home").style.display="block";


if(document.getElementById("custName")){
document.getElementById("custName").value=
savedName||"";
}

if(document.getElementById("custMobile")){
document.getElementById("custMobile").value=
savedMobile||"";
}

window.scrollTo(0,0);

},4000);

}

document.addEventListener("DOMContentLoaded", function(){

  document.querySelectorAll("video").forEach(function(v){

    v.muted = true;
    v.setAttribute("playsinline","");
    v.setAttribute("webkit-playsinline","");

    function forcePlay(){
      v.play().catch(()=>{});
    }

    forcePlay();

    document.addEventListener("touchstart", forcePlay, {once:true});

    v.addEventListener("loadeddata", forcePlay);
  });

});

document.addEventListener("DOMContentLoaded", function(){

  const cartList = document.getElementById("cartItemsList");

  cartList.addEventListener("click", function(e){

    const row = e.target.closest(".cartItemRow");
    if(!row) return;

    // ignore + - clicks
    if(e.target.closest(".cartControl")){
      return;
    }

    const control = row.querySelector(".cartControl");

    if(!control){
      console.log("❌ control not found");
      return;
    }

    const id = control.dataset.id;
    const table = control.dataset.table;

    console.log("CLICKED:", id, table); // 🔥 DEBUG

    const key = table + "_" + id;
    const item = getProduct(key);

    if(!item){
      console.log("❌ item not found:", key);
      return;
    }

    openPopup({
      ...item,
      table: table
    });

  });

});

document.getElementById("closePreview").onclick = function(){
  const preview = document.getElementById("imgPreview");
  const img = document.getElementById("previewImg");

  preview.classList.remove("active");

  // 🔥 reset zoom
  img.style.transform = "scale(1)";
};
document.addEventListener("DOMContentLoaded", function(){

  let scale = 1;
  let startDistance = 0;

  const img = document.getElementById("previewImg");

  if(!img) return;

  // 🔥 DESKTOP ZOOM (mouse wheel)
  img.addEventListener("wheel", function(e){
    e.preventDefault();

    if(e.deltaY < 0){
      scale += 0.2;
    } else {
      scale -= 0.2;
    }

    scale = Math.max(1, Math.min(scale, 4));

    img.style.transform = `scale(${scale})`;
  });

  // 🔥 MOBILE PINCH ZOOM
  img.addEventListener("touchstart", function(e){
    if(e.touches.length === 2){
      startDistance = getDistance(e.touches);
    }
  });

  img.addEventListener("touchmove", function(e){
    if(e.touches.length === 2){
      e.preventDefault();

      let newDistance = getDistance(e.touches);

      if(startDistance){
        let diff = newDistance - startDistance;

        scale += diff * 0.005;
        scale = Math.max(1, Math.min(scale, 4));

        img.style.transform = `scale(${scale})`;
      }

      startDistance = newDistance;
    }
  });

  // 🔥 RESET on close
  document.getElementById("closePreview").onclick = function(){
    document.getElementById("imgPreview").classList.remove("active");

    scale = 1;
    img.style.transform = "scale(1)";
  };

  // 🔥 helper
  function getDistance(touches){
    let dx = touches[0].clientX - touches[1].clientX;
    let dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx*dx + dy*dy);
  }

});
const img1 = document.querySelector("#cizooBtn1 .img1");
const img2 = document.querySelector("#cizooBtn1 .img2");

setInterval(()=>{
  img1.classList.toggle("active");
  img2.classList.toggle("active");
},3000);

function goHome(){

  // 🔝 scroll top
  window.scrollTo(0,0);

  // ❌ hide HOME (all grocery UI)
  const home = document.getElementById("home");
  if(home) home.style.display = "none";

  // ❌ hide MAIN (location screen if visible)
  const main = document.getElementById("main");
  if(main) main.style.display = "none";

  // ❌ hide any popup if open
  const popup = document.getElementById("orderPopup");
  if(popup) popup.style.display = "none";

  // ✅ show OPTION SCREEN
  const option = document.getElementById("optionScreen");
  if(option) option.style.display = "block";
}
// 🔥 NORMALIZE FUNCTION


const input = document.querySelector(".searchBar input");
const resultsBox = document.getElementById("searchResults");

input.addEventListener("input", function(){

  const value = this.value.trim();

  if(!value){
    resultsBox.style.display = "none";
    return;
  }

  let results = [];
  const query = normalize(value);

  // 🔥 SMART SEARCH
  Object.entries(window.productMap || {}).forEach(([key, p]) => {

    const name = normalize(p.name);
    let match = false;

    // ✅ direct match
    if(name.includes(query)){
      match = true;
    }

    // ✅ Telugu keyword match
    Object.entries(translateMap).forEach(([tel, eng]) => {
      if(query.includes(tel) && name.includes(eng)){
        match = true;
      }
    });

    // ✅ partial word match
    query.split(" ").forEach(word => {
      if(name.includes(word)){
        match = true;
      }
    });

    if(match){
      const table = key.substring(0, key.lastIndexOf("_"));

      results.push({
        ...p,
        table_name: table
      });
    }

  });

  // 🔥 REMOVE DUPLICATES
  results = [...new Map(results.map(p => [p.id + p.table_name, p])).values()];

  resultsBox.innerHTML = "";

  if(results.length === 0){
   resultsBox.innerHTML = `
  <div style="
    text-align:center;
    padding:20px 10px;
  ">
    <div style="font-size:14px;font-weight:600;color:#333;">
      No results found
    </div>

    <div style="font-size:12px;color:#777;margin-top:6px;">
      Try searching for
    </div>

    <div style="
      margin-top:10px;
      display:flex;
      justify-content:center;
      gap:8px;
      flex-wrap:wrap;
    ">

      <span class="suggestTag">Milk</span>
      <span class="suggestTag">Snacks</span>
      <span class="suggestTag">Rice</span>
      <span class="suggestTag">Oil</span>

    </div>
  </div>
`;
document.querySelectorAll(".suggestTag").forEach(tag=>{
    tag.onclick = () => {
      input.value = tag.innerText.toLowerCase();
      input.dispatchEvent(new Event("input"));
    };
  });

    resultsBox.style.display = "block";
    return;
  }

  results.slice(0,10).forEach(p => {

    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.gap = "10px";
    div.style.padding = "10px";
    div.style.borderBottom = "1px solid #eee";
    div.style.cursor = "pointer";

    div.innerHTML = `
      <img src="${p.image1}" style="width:40px;height:40px;border-radius:8px;object-fit:cover;">
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:600;">${p.name}</div>
        <div style="font-size:12px;color:#666;">₹${p.discount_price || p.price}</div>
      </div>
    `;

    div.onclick = () => {

      // 🔥 CLEAR SEARCH
      input.value = "";

      // 🔥 CLOSE KEYBOARD
      input.blur();

      resultsBox.style.display = "none";

      // 🔥 OPEN EXISTING POPUP
      openPopup({
        ...p,
        table: p.table_name
      });

    };

    resultsBox.appendChild(div);
  });

  resultsBox.style.display = "block";

});

// 🔥 HIDE ON OUTSIDE CLICK
document.addEventListener("click", (e)=>{
  if(!e.target.closest(".searchBar")){
    resultsBox.style.display = "none";
  }
});
document.getElementById("cizooBtn1").onclick = function() {
  window.location.href = "services.html";
};

window.onload = function(){

  const skip = sessionStorage.getItem("skipIntro");

  if(skip === "true"){

    // ✅ hide splash
    const splash = document.getElementById("splash");
    if(splash) splash.style.display = "none";

    // ✅ hide loading/main screen
    const main = document.getElementById("main");
    if(main) main.style.display = "none";

    // ✅ show option screen
    const option = document.getElementById("optionScreen");
    if(option) option.style.display = "block";

    // 🔥 optional: scroll top
    window.scrollTo(0,0);
  }

};


document.getElementById("cizooBtn3").onclick = function () {
  window.location.href = "join.html";
};
function goCleaning() {
  window.location.href = "cleaning.html";
}
