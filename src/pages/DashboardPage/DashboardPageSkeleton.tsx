import React from "react"
import { Box } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"

import Title from "../../components/Styled/Title"
import { ModuleListSkeleton } from "../../features/modules/ModuleList"

function Header() {
    return (
        <Title>
            <Box
                display="flex"
                alignItems="center"
            >
                <Box mr={2}>
                    <Skeleton
                        variant="circle"
                        width={32}
                        height={32}
                    />
                </Box>

                <Skeleton
                    variant="text"
                    width={250}
                    height={29}
                />
            </Box>
        </Title>
    )
}

function StatisticCard() {
    return (
        <Skeleton
            variant="rect"
            width={256}
            height={129}
        />
    )
}

function ChartCard() {
    return (
        <Skeleton
            variant="rect"
            width={370}
            height={375}
        />
    )
}

function GuildPage() {
    return (
        <>
            <Header/>
            
            <Box
                display="flex"
                justifyContent="space-between"
                mb={3}
            >
                <StatisticCard/>
                <StatisticCard/>
                <StatisticCard/>
                <StatisticCard/>
            </Box>

            <Box
                display="flex"
                justifyContent="space-between"
                mb={3}
            >
                <ChartCard/>
                <ChartCard/>
                <ChartCard/>
            </Box>

            <ModuleListSkeleton/>
        </>
    )
}

export default GuildPage
