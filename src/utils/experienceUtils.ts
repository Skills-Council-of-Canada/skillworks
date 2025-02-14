
export const calculateProgress = (milestones: Array<{ status: string }>) => {
  if (!milestones.length) return 0;
  const completed = milestones.filter(m => m.status === 'completed').length;
  return Math.round((completed / milestones.length) * 100);
};
