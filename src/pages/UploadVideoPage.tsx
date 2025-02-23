
import UploadVideo from '../components/UploadVideo';

const UploadVideoPage = () => {
  return (
    <div className="p-4">
      <UploadVideo onClose={() => window.history.back()} />
    </div>
  );
};

export default UploadVideoPage;
