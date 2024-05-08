import { getMessage } from './errors.utils';

describe('Utils', () => {
  it('should getMessage', () => {
    expect(getMessage(null)).toEqual('');
    expect(getMessage({})).toEqual('');
    expect(getMessage({ required: true })).toEqual('Champ requis');
    expect(getMessage({ blackList: { blackListedWord: 'zzz' } })).toEqual(
      'Mot interdit (zzz)'
    );
  });
});
