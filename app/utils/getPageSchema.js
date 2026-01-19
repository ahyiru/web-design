import apiList from '@app/apis/apiList';
import {defProject} from '@app/configs';

const pageSchema = async ({id}) => {
  const {result} = await apiList.listSchemaFn({routerId: id, projectId: defProject.id});
  return {result};
};

export default pageSchema;
