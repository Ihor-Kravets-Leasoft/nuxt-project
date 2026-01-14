export default defineEventHandler(async event => {
  const body = await readBody(event);
  // Here you would typically save to database
  // For now, just return success
  return { success: true };
});
