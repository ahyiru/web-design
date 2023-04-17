const getContext = async ({folder, name, type = ''}) => (await import(`@app/doc/${folder}/${name}${type}`))?.default;

export default getContext;
