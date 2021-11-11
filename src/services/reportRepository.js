import Repository from './repository';

const url = 'report';

const ReportRepository = {
  get: () => Repository.get(url)
};

export default ReportRepository;
