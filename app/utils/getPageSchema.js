import apiList from '@app/apis/apiList';
import {defProject} from '@app/configs';

const pageSchema = async ({_id}) => {
  const {result} = await apiList.listSchemaFn({routerId: _id, projectId: defProject._id});
  return {result};
};

export default pageSchema;
