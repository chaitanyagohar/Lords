import { createClient } from '@supabase/supabase-js';

// Initialize with your service role key (or admin key)
const supabase = createClient('https://qxfsfutbgelyyabdexuh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4ZnNmdXRiZ2VseXlhYmRleHVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMjAyNTIsImV4cCI6MjA4NzU5NjI1Mn0.qXZgG4yjjQO2UUyOncqOXkKQkaXi19vN1k4lik0VOEo');

async function updateImageUrls() {
  // 1. Fetch all property records
  const { data: properties, error } = await supabase
    .from('properties')
    .select('id, image')
    .not('image', 'is', null);

  if (error) console.error(error);

  for (const property of properties) {
    if (property.image.includes('res.cloudinary.com')) {
      // 2. Logic: Insert 'f_auto,q_auto,w_800/' after the 'upload/' segment
      const oldUrl = property.image;
      const newUrl = oldUrl.replace('/upload/', '/upload/f_auto,q_auto,w_800/');
      
      console.log(`Updating ID ${property.id}: ${newUrl}`);

      // 3. Update the database
      await supabase
        .from('properties')
        .update({ image: newUrl })
        .eq('id', property.id);
    }
  }
  console.log("Migration complete!");
}

updateImageUrls();