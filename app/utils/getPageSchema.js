import {getApi} from '@app/apis/apiList';
import {defProject} from '@app/configs';

const pageSchema = async ({id}) => {
  const {result} = await getApi().listSchemaFn({routerId: id, projectId: defProject.id});
  return {result};
};

export default pageSchema;
