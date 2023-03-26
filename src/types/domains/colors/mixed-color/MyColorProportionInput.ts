import {
  ColorProportionInput,
  InputMaybe,
} from '../../../../graphql/generated/graphql'

export class MyColorProportionInput implements ColorProportionInput {
  createdAt: InputMaybe<string>
  id: InputMaybe<string>
  mixedColorId: InputMaybe<string>
  proportion: string
  rawColorId: string
  updatedAt: InputMaybe<string>
  userId: InputMaybe<string>
}
