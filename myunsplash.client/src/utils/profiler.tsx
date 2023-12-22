export const onRenderHandler = (
	id: string,
	phase: 'mount' | 'update' | 'nested-update'
) => {
	console.log(`🚀 ~ ${id} ~ phase:`, phase);
};
