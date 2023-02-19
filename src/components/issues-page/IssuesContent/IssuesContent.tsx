import { Box, Button, Switch, TextInput, Title } from '@mantine/core'
import { useEffect } from 'react'
import { useIssuesQuery } from '../../../hooks/react-query/monerate/issue/useIssuesQuery'
import useIssueModalStore from '../../../hooks/zustand/modals/useIssueModalStore'
import useIssueFilterStore from '../../../hooks/zustand/useIssueFilterStore'
import { MyIssueInput } from '../../../types/domains/monerate/issue/MyIssueValidInput'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import IssueLabelsSelector from '../../_common/modals/IssueModal/IssueLabelsSelector/IssueLabelsSelector'
import MyPaper from '../../_common/overrides/MyPaper'
import { DndIssuesTable } from './DndIssuesTable/DndIssuesTable'

type Props = {
  test?: string
}

const IssuesContent = (props: Props) => {
  useEffect(() => {
    document.title = 'Recipes'
  }, [])

  const { openModal } = useIssueModalStore()
  const { data: issues } = useIssuesQuery()

  const { filterByIsSolved, toggleFilterByIsSolved } = useIssueFilterStore()
  const {
    highlightTop: highlightTopUnsolved,
    setHighlightTop: setHighlightTopUnsolved,
    filterIssueLabelIds,
    setFilterIssueLabelIds,
  } = useIssueFilterStore()
  return (
    <>
      <Box mt={16} />
      <MyPaper>
        <FlexVCenter justify={'space-between'} align="center">
          <Title>Issues</Title>

          <IssueLabelsSelector
            issueLabelIds={filterIssueLabelIds}
            onChange={(value) => {
              setFilterIssueLabelIds(value)
            }}
          />

          <TextInput
            label="Highlight top"
            sx={{ width: 96 }}
            value={highlightTopUnsolved}
            onChange={(e) => {
              const num = parseInt(e.currentTarget.value)
              if (num >= 0) {
                setHighlightTopUnsolved(num)
                return
              }

              setHighlightTopUnsolved(0)
            }}
          />
        </FlexVCenter>

        <Box mt={16} />
        <Box>
          <DndIssuesTable issues={issues || []} />
        </Box>

        <FlexVCenter mt={24} justify={'space-between'}>
          <Button
            onClick={() => {
              openModal(new MyIssueInput())
            }}
          >
            + Add Issue
          </Button>

          <Switch
            label={filterByIsSolved ? 'Solved issues' : 'Unsolved issues'}
            checked={filterByIsSolved}
            onChange={toggleFilterByIsSolved}
          />
        </FlexVCenter>
      </MyPaper>
    </>
  )
}

export default IssuesContent
