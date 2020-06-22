import React from 'react'
import QnAContent from './QnAContent'
import AsideMenu from './AsideMenu'

export default function MainContent() {
    return (
        <>
            <div className="qna-content">
                <QnAContent />
            </div>
            <div className="aside-menu">
                <AsideMenu />
            </div>
        </>
    )
}
