import apiList from '@app/utils/getApis';
import defProject from '@app/configs/projects';

const pageSchema = async ({id}) => {
  const {result} = await apiList.listSchemaFn({routerId: id, projectId: defProject._id});
  return {result};
};

export default pageSchema;
