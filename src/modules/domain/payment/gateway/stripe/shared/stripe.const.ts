export enum CurrencyEnum {
  VND = 'VND',
  USD = 'USD',
}

export enum CardBrandEnum {
  Visa = 'pm_card_visa',
  Mastercard = 'pm_card_mastercard',
  JCB = 'pm_card_jcb',
  AmericanExpress = 'pm_card_amex',
  UnionPay = 'pm_card_unionpay',
}

export const MOCK_CARD_TOKEN_MAPPING = {
  [CardBrandEnum.Visa]: 'tok_visa',
  [CardBrandEnum.Mastercard]: 'tok_mastercard',
  [CardBrandEnum.JCB]: 'tok_jcb',
  [CardBrandEnum.AmericanExpress]: 'tok_amex',
  [CardBrandEnum.UnionPay]: 'tok_unionpay',
};
