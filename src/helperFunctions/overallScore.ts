// Mean of taste, visual and texture — returns null if any score is missing
export const calculateOverallScore = (
	taste: number | undefined,
	texture: number | undefined,
	visual: number | undefined
): number | null => {
	if (!taste || !texture || !visual) return null;
	return Math.round(((taste + texture + visual) / 3) * 10) / 10;
};
