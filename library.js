const SUPABASE_URL = "https://sdorqlfwhuefepjhknxj.supabase.co";
const SUPABASE_KEY = "sb_publishable_YzuKCGs9UUuq8BQpo6rbaQ_GIpvkHvi";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

loadFiles();

async function uploadFile() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const file = document.getElementById("fileInput").files[0];
  const msg = document.getElementById("msg");

  if (!title || !file) {
    msg.innerHTML = "Please enter title and choose a photo or PDF.";
    return;
  }

  const fileExt = file.name.split(".").pop().toLowerCase();
  const allowedExt = ["jpg", "jpeg", "png", "webp", "heic", "heif", "pdf"];

  if (!allowedExt.includes(fileExt)) {
    msg.innerHTML = "Only photos and PDF files are allowed.";
    return;
  }

  msg.innerHTML = "Uploading...";

  const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const fileName = Date.now() + "_" + safeFileName;

  const { error: uploadError } = await supabase.storage
    .from("library")
    .upload(fileName, file, { upsert: true });

  if (uploadError) {
    msg.innerHTML = "Upload error: " + uploadError.message;
    return;
  }

  const { data } = supabase.storage
    .from("library")
    .getPublicUrl(fileName);

  const publicUrl = data.publicUrl;

  const { error } = await supabase
    .from("library")
    .insert([{
      title,
      description,
      file_url: publicUrl
    }]);

  if (error) {
    msg.innerHTML = "Database error: " + error.message;
    return;
  }

  msg.innerHTML = "✅ File uploaded successfully.";

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("fileInput").value = "";

  loadFiles();
}

async function loadFiles() {
  const container = document.getElementById("items");

  const { data, error } = await supabase
    .from("library")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    container.innerHTML = "Load error: " + error.message;
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "<p>No files yet.</p>";
    return;
  }

  container.innerHTML = "";

  data.forEach(item => {
    const url = item.file_url || "";
    const isImage = url.match(/\.(jpg|jpeg|png|webp)$/i);
    const isHeic = url.match(/\.(heic|heif)$/i);

    container.innerHTML += `
      <div class="card" style="margin-top:20px">
        <h3>${item.title}</h3>
        <p>${item.description || ""}</p>

        ${isImage ? `<img src="${url}" style="max-width:100%;border-radius:15px;margin:10px 0">` : ""}
        ${isHeic ? `<p>📷 iPhone photo file</p>` : ""}
        ${url.match(/\.pdf$/i) ? `<p>📄 PDF File</p>` : ""}

        <a href="${url}" target="_blank">
          <button class="btn">Open File</button>
        </a>
      </div>
    `;
  });
}
