import { ActionIcon, Menu } from '@mantine/core'
import { useState } from 'react'

import { MdDelete, MdMoreHoriz } from 'react-icons/md'
import { useDeleteWishlistMutation } from '../../../../../hooks/react-query/monerate/wishlist-item/useDeleteWishlistMutation'
import { MyWishlistItemValidInput } from '../../../../../types/domains/monerate/wishlist-item/MyWishlistItemValidInput'

type Props = {
  recipe: MyWishlistItemValidInput
  afterDelete: () => void
}

export const WishlistItemMoreMenu = (props: Props) => {
  const { mutate: submitDelete } = useDeleteWishlistMutation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Menu shadow="md" width={200} position="bottom-end" opened={isOpen}>
      <Menu.Target>
        <ActionIcon onClick={() => setIsOpen(true)}>
          <MdMoreHoriz />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          color="red"
          onClick={() => {
            if (
              confirm('Are you sure you want to delete this wishlist item?')
            ) {
              submitDelete(props.recipe.id!, {
                onSuccess: () => {
                  props.afterDelete()
                  setIsOpen(false)
                },
              })
            }
          }}
          icon={<MdDelete />}
        >
          Delete recipe
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
