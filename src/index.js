import _ from 'lodash'
import './style.css'

var fullRange = [
    36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
    55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73,
    74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
    93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108,
    109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123,
    124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138,
    139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153,
    154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165,
]
var twentyFalseRange = [
    36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132,
    136, 140, 144, 149, 153, 157, 161, 165,
]
var fortyTrueRange = [
    36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104,
    108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 149, 153, 157, 161,
]
var fortyFalseRange = [
    36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132,
    136, 140, 144, 149, 153, 157, 161,
]

window.showChannelLimit = async function () {
    removeRangeButtons()
    let UseChannelLimit = document.getElementById('UseChannelLimit')
    let ChannelLimitLabel = document.getElementById('ChannelLimitLabel')
    let SelectAllChannelLabel = document.getElementById('SelectAllChannelLabel')

    if (UseChannelLimit.checked == true) {
        addRangeButtons()
        ChannelLimitLabel.style.display = 'inline'
        SelectAllChannelLabel.style.display = 'inline'
    } else {
        removeRangeButtons()
        ChannelLimitLabel.style.display = 'none'
        SelectAllChannelLabel.style.display = 'none'
    }
}

window.updateUseChannelLimitState = async function () {
    let UseChannelLimitState = document.getElementById('UseChannelLimitState')
    let UseChannelLimit = document.getElementById('UseChannelLimit')

    if (UseChannelLimit.checked) {
        UseChannelLimitState.value = 'true'
        window.showChannelLimit()
    } else {
        UseChannelLimitState.value = 'false'
        window.showChannelLimit()
    }
}

window.updateExtendedChannelState = async function () {
    let ExtendedChannelState = document.getElementById('ExtendedChannelState')
    let ExtendedChannel = document.getElementById('ExtendedChannel')

    if (ExtendedChannel.checked) {
        ExtendedChannelState.value = 'true'
    } else {
        ExtendedChannelState.value = 'false'
    }
}

async function addRangeButtons() {
    ChannelLimitLabel.innerHTML = 'Список разрешённых каналов'
    ChannelLimitLabel.id = 'ChannelLimitLabel'
    let ChannelBonding = document.getElementById('ChannelBonding')
    let channelButtons = document.createElement('div')
    channelButtons.id = 'ChannelButtons'
    ChannelLimitLabel.appendChild(channelButtons)
    let ExtendedChannel = document.getElementById('ExtendedChannel')

    switch (ChannelBonding.value) {
        case '5':
        case '10': {
            addButtonsForRange(fullRange)
            break
        }
        case '20': {
            if (ExtendedChannel.checked) {
                addButtonsForRange(fullRange)
            } else {
                addButtonsForRange(twentyFalseRange)
            }
            break
        }
        case '40':
        case '80': {
            if (ExtendedChannel.checked) {
                addButtonsForRange(fortyTrueRange)
            } else {
                addButtonsForRange(fortyFalseRange)
            }
            break
        }
    }
}

async function removeRangeButtons() {
    let ChannelCheckboxGroup = document.getElementById('ChannelCheckboxGroup')

    while (ChannelCheckboxGroup.firstChild) {
        ChannelCheckboxGroup.removeChild(ChannelCheckboxGroup.firstChild)
    }
}

window.showExtendedChannel = async function () {
    let extendedChannel = document.getElementById('ExtendedChannelSwitch')
    let extendedChannelLabel = document.getElementById('ExtendedChannelLabel')
    let ChannelBonding = document.getElementById('ChannelBonding')

    if (ChannelBonding.value == 5 || ChannelBonding.value == 10) {
        extendedChannel.style.display = 'none'
        extendedChannelLabel.style.display = 'none'
    } else {
        extendedChannel.style.display = 'inherit'
        extendedChannel.style.margin = '0 auto'
        extendedChannelLabel.style.display = 'inherit'
    }
}

function addButtonsForRange(range) {
    let ChannelCheckboxGroup = document.getElementById('ChannelCheckboxGroup')
    let channelButtons = document.getElementById('ChannelButtons')
    channelButtons.id = 'ChannelButtons'
    channelButtons.name = 'ChannelButtons'
    channelButtons.className = 'ChannelButtons'
    ChannelCheckboxGroup.appendChild(channelButtons)

    for (let i = 0; i < range.length; ++i) {
        let channelSwitch = document.createElement('input')
        channelSwitch.type = 'checkbox'
        channelSwitch.id = 'Channel' + range[i]
        channelSwitch.value = range[i]
        channelSwitch.name = 'Channel'

        let switchLabel = document.createElement('label')
        switchLabel.innerHTML = range[i]
        switchLabel.className = 'channelSwitcher'
        switchLabel.htmlFor = channelSwitch.id

        channelButtons.appendChild(channelSwitch)
        channelButtons.appendChild(switchLabel)
    }
}

window.parseFormDataFromMain = async function () {
    document.getElementById('SSID').value = getContents('SSID')
    document.getElementById('ChannelBonding').value =
        getContents('ChannelBonding')
    document.getElementById('WPAKey').value = getContents('WPAKey')
    document.getElementById('ExtendedChannel').value = getContents(
        'ExtendedChannelState'
    )
    document.getElementById('UseChannelLimit').value = getContents(
        'UseChannelLimitState'
    )
    document.getElementById('Channels').value = getChannels()
}

window.parseFormDataFromRaw = async function () {
    document.getElementById('SSID').value = getContents('SSID')
    document.getElementById('ChannelBonding').value =
        getContents('ChannelBonding')
    document.getElementById('WPAKey').value = getContents('WPAKey')

    let ExtendedChannelState = getContents('ExtendedChannel')
    if (ExtendedChannelState == 'true') {
        document.getElementById('ExtendedChannel').checked = true
    } else {
        document.getElementById('ExtendedChannel').checked = false
    }
    window.updateExtendedChannelState()

    let UseChannelLimitState = getContents('UseChannelLimit')

    if (UseChannelLimitState == 'true') {
        document.getElementById('UseChannelLimit').checked = true
    } else {
        document.getElementById('UseChannelLimit').checked = false
    }
    window.updateUseChannelLimitState()

    let channelString = getContents('Channels')
    let channels = channelString.split('+')
    for (let i = 0; i < channels.length; ++i) {
        let channel = document.getElementById('Channel' + channels[i])
        if (channel != null) {
            channel.checked = true
        } else {
            return
        }
    }
}

function getContents(stringToFind) {
    let formData = window.location.search

    let begin = formData.indexOf(stringToFind + '=')

    if (begin == -1) {
        return ''
    }

    begin += stringToFind.length + 1

    let end = formData.indexOf('&', begin)

    if (end == -1) {
        return formData.slice(begin, formData.length)
    }

    return formData.slice(begin, end)
}

function getChannels() {
    let formData = window.location.search

    let stringToFind = 'Channel='
    let ChannelString = ''

    let begin = formData.indexOf(stringToFind)

    if (begin == -1) {
        return ChannelString
    }

    begin += stringToFind.length

    let end = formData.indexOf('&', begin)

    while (true) {
        ChannelString += formData.slice(begin, end) + ' '

        begin = formData.indexOf(stringToFind, end)

        if (begin == -1) {
            return ChannelString
        }
        begin += stringToFind.length

        end = formData.indexOf('&', begin)

        if (end == -1) {
            ChannelString += formData.slice(begin) + ' '
            return ChannelString
        }
    }
}

window.SelectAllChannels = async function () {
    let channelButtons = document.getElementById('ChannelButtons')
    let SelectAllChannelSwitch = document.getElementById(
        'SelectAllChannelSwitch'
    )

    if (SelectAllChannelSwitch.checked && channelButtons.children.length != 0) {
        for (const child of channelButtons.children) {
            child.checked = true
        }
    } else {
        for (const child of channelButtons.children) {
            child.checked = false
        }
    }
}
