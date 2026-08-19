import {apisStore} from '@app/store/stores';
const apiList = apisStore.getState()?.apis ?? {};
import {defProject} from '@app/configs';

const pageSchema = async ({id}) => {
  const {result} = await apiList.listSchemaFn({routerId: id, projectId: defProject.id});
  return {result};
};

export default pageSchema;
