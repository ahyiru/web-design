import apiList from '@app/utils/getApis';
import {defProject} from '@app/configs';

const pageSchema = async ({_id}) => {
  const {result} = await apiList.listSchemaFn({routerId: _id, projectId: defProject._id});
  return {result};
};

export default pageSchema;
