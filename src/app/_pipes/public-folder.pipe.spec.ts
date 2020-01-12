import { PublicFolderPipe } from './public-folder.pipe';

describe('PublicFolderPipe', () => {
  it('create an instance', () => {
    const pipe = new PublicFolderPipe();
    expect(pipe).toBeTruthy();
  });
});
