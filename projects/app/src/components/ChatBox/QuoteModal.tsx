import React, { useMemo } from 'react';
import { ModalBody, Box, useTheme } from '@chakra-ui/react';

import MyModal from '@fastgpt/web/components/common/MyModal';
import { useTranslation } from 'next-i18next';
import type { SearchDataResponseItemType } from '@fastgpt/global/core/dataset/type';
import QuoteItem from '../core/dataset/QuoteItem';
import RawSourceBox from '../core/dataset/RawSourceBox';

const QuoteModal = ({
  rawSearch = [],
  onClose,
  showDetail,
  metadata
}: {
  rawSearch: SearchDataResponseItemType[];
  onClose: () => void;
  showDetail: boolean;
  metadata?: {
    collectionId: string;
    sourceId?: string;
    sourceName: string;
  };
}) => {
  const { t } = useTranslation();
  const filterResults = useMemo(
    () =>
      metadata
        ? rawSearch.filter(
            (item) =>
              item.collectionId === metadata.collectionId && item.sourceId === metadata.sourceId
          )
        : rawSearch,
    [metadata, rawSearch]
  );

  return (
    <>
      <MyModal
        isOpen={true}
        onClose={onClose}
        h={['90vh', '80vh']}
        isCentered
        minW={['90vw', '600px']}
        iconSrc={!!metadata ? undefined : '/imgs/modal/quote.svg'}
        title={
          <Box>
            {metadata ? (
              <RawSourceBox {...metadata} canView={false} />
            ) : (
              <>{t('core.chat.Quote Amount', { amount: rawSearch.length })}</>
            )}
            <Box fontSize={'xs'} color={'myGray.500'} fontWeight={'normal'}>
              {t('core.chat.quote.Quote Tip')}
            </Box>
          </Box>
        }
      >
        <ModalBody>
          <QuoteList rawSearch={filterResults} showDetail={showDetail} />
        </ModalBody>
      </MyModal>
    </>
  );
};

export default QuoteModal;

export const QuoteList = React.memo(function QuoteList({
  rawSearch = [],
  showDetail
}: {
  rawSearch: SearchDataResponseItemType[];
  showDetail: boolean;
}) {
  const theme = useTheme();
  const formatMD = (str: string) => {
    str = str.replace(/^标题:/gm, '**标题**: ');
    str = str.replace(/^作者:/gm, '**作者**: ');
    str = str.replace(/^关键词:/gm, '**关键词**: ');
    str = str.replace(/^摘要:/gm, '**摘要**: \n');
    str = str.replace(/^期刊:/gm, '**期刊**: ');
    str = str.replace(/^时间:/gm, '**发表时间**: ');
    str = str.replace(/^地址URL:/gm, '**论文链接**: ');

    return str;
  };
  const formatMD_EN = (str: string) => {
    str = str.replace(/^Title:/gm, '**标题**: ');
    str = str.replace(/^Author:/gm, '**作者**: ');
    str = str.replace(/^Keywords:/gm, '**关键词**: ');
    str = str.replace(/^Abstract:/gm, '**摘要**: \n');
    str = str.replace(/^Journal:/gm, '**期刊**: ');
    str = str.replace(/^Time:/gm, '**发表时间**: ');
    str = str.replace(/^URL:/gm, '**论文链接**: ');
    str = str.replace(/\N/gm, '');

    return str;
  };
  return (
    <>
      {rawSearch.map((item, i) => {
        // 在这里处理 item
        const newItem = {
          ...item,
          q: formatMD_EN(item.a),
          a: '' // 不显示英文
        };

        return (
          <Box
            key={i}
            flex={'1 0 0'}
            p={2}
            borderRadius={'sm'}
            border={theme.borders.base}
            _notLast={{ mb: 2 }}
            _hover={{ '& .hover-data': { display: 'flex' } }}
            bg={i % 2 === 0 ? 'white' : 'myWhite.500'}
          >
            <QuoteItem quoteItem={newItem} canViewSource={showDetail} linkToDataset={showDetail} />
          </Box>
        );
      })}
    </>
  );
});
